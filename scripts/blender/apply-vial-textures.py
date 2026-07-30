"""
Archon vial — Step 3: import + apply TurboSquid PBR textures.
Run in Blender: Scripting workspace → Open this file → Run Script (▶)
Or: Blender → File → Open → run from Text Editor
"""

import bpy
import os

# ── Paths (edit if your project lives elsewhere) ──
PROJECT = "/Users/jaleahroscoe/Desktop/Archon Website"
GLB = os.path.join(PROJECT, "public/models/archon-vial.glb")
TEX_DIR = os.path.join(PROJECT, "public/models/archon-vial-textures")

TEXTURES = {
    "base": ("Vial_BaseColor.png", "sRGB"),
    "metal": ("Vial_Metallic.png", "Non-Color"),
    "rough": ("Vial_Roughness.png", "Non-Color"),
    "normal": ("Vial_NormalOpenGL.png", "Non-Color"),
    "trans": ("Vial_Transmission.png", "Non-Color"),
}


def clear_defaults():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)


def import_vial():
    if not os.path.exists(GLB):
        raise FileNotFoundError(f"Missing GLB: {GLB}")
    bpy.ops.import_scene.gltf(filepath=GLB)
    vial = bpy.data.objects.get("Vial")
    if not vial:
        meshes = [o for o in bpy.data.objects if o.type == "MESH"]
        if not meshes:
            raise RuntimeError("Import succeeded but no mesh found.")
        vial = meshes[0]
        vial.name = "Vial"
    return vial


def base_color_file():
    for name in ("Vial_BaseColor_archon.png", "Vial_BaseColor_logo.png"):
        path = os.path.join(TEX_DIR, name)
        if os.path.exists(path):
            return path, "sRGB"
    return os.path.join(TEX_DIR, TEXTURES["base"][0]), TEXTURES["base"][1]


def apply_pbr_material(vial):
    for key, (fname, _) in TEXTURES.items():
        if key == "base":
            continue
        path = os.path.join(TEX_DIR, fname)
        if not os.path.exists(path):
            raise FileNotFoundError(f"Missing texture: {path}")

    base_path, base_cs = base_color_file()
    if not os.path.exists(base_path):
        raise FileNotFoundError(f"Missing base color: {base_path}")

    mat = vial.data.materials[0] if vial.data.materials else None
    if mat is None:
        mat = bpy.data.materials.new(name="Vial")
        vial.data.materials.append(mat)

    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    output = nodes.new("ShaderNodeOutputMaterial")
    output.location = (500, 0)
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (200, 0)
    links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])

    def load_image(path, colorspace):
        img = bpy.data.images.load(path, check_existing=True)
        img.colorspace_settings.name = colorspace
        img.reload()
        return img

    def make_tex(img, loc):
        n = nodes.new("ShaderNodeTexImage")
        n.image = img
        n.location = loc
        n.label = "BaseColor"
        return n

    base = make_tex(load_image(base_path, base_cs), (-700, 350))
    metal = make_tex(
        load_image(os.path.join(TEX_DIR, TEXTURES["metal"][0]), TEXTURES["metal"][1]),
        (-700, 100),
    )
    rough = make_tex(
        load_image(os.path.join(TEX_DIR, TEXTURES["rough"][0]), TEXTURES["rough"][1]),
        (-700, -100),
    )
    normal_tex = make_tex(
        load_image(os.path.join(TEX_DIR, TEXTURES["normal"][0]), TEXTURES["normal"][1]),
        (-700, -320),
    )
    trans = make_tex(
        load_image(os.path.join(TEX_DIR, TEXTURES["trans"][0]), TEXTURES["trans"][1]),
        (-700, -540),
    )

    links.new(base.outputs["Color"], bsdf.inputs["Base Color"])
    links.new(metal.outputs["Color"], bsdf.inputs["Metallic"])
    links.new(rough.outputs["Color"], bsdf.inputs["Roughness"])

    norm = nodes.new("ShaderNodeNormalMap")
    norm.location = (-350, -320)
    links.new(normal_tex.outputs["Color"], norm.inputs["Color"])
    links.new(norm.outputs["Normal"], bsdf.inputs["Normal"])

    trans_input = bsdf.inputs.get("Transmission Weight") or bsdf.inputs.get(
        "Transmission"
    )
    if trans_input:
        links.new(trans.outputs["Color"], trans_input)

    bsdf.inputs["IOR"].default_value = 1.52


def frame_vial(vial):
    vial.hide_viewport = False
    bpy.ops.object.select_all(action="DESELECT")
    vial.select_set(True)
    bpy.context.view_layer.objects.active = vial
    for area in bpy.context.screen.areas:
        if area.type == "VIEW_3D":
            area.spaces.active.shading.type = "MATERIAL"
            with bpy.context.temp_override(
                window=bpy.context.window, area=area, region=area.regions[-1]
            ):
                bpy.ops.view3d.view_selected()


def main():
    vial = bpy.data.objects.get("Vial")
    if vial is None:
        clear_defaults()
        vial = import_vial()
    apply_pbr_material(vial)
    frame_vial(vial)

    save_path = os.path.join(PROJECT, "public/models/archon-vial-edit.blend")
    bpy.ops.wm.save_as_mainfile(filepath=save_path)
    print(f"✓ Step 3 complete — saved: {save_path}")


main()
