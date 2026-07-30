"""
Archon vial — Step 4: full navy Archon label on TurboSquid vial.
Blender → Scripting → Open → Run Script (▶)
"""

import bpy
import os

PROJECT = "/Users/jaleahroscoe/Desktop/Archon Website"
SCRIPT_DIR = os.path.join(PROJECT, "scripts/blender")
ARCHON_BASE = os.path.join(
    PROJECT, "public/models/archon-vial-textures/Vial_BaseColor_archon.png"
)


def generate():
    path = os.path.join(SCRIPT_DIR, "generate-full-label-texture.py")
    exec(compile(open(path).read(), path, "exec"), {"__name__": "__main__"})


def apply_materials():
    path = os.path.join(SCRIPT_DIR, "apply-vial-textures.py")
    exec(compile(open(path).read(), path, "exec"), {"__name__": "__main__"})


def swap_base_color():
    vial = bpy.data.objects.get("Vial")
    if not vial or not vial.data.materials:
        raise RuntimeError("No Vial material found.")

    mat = vial.data.materials[0]
    img = bpy.data.images.load(ARCHON_BASE, check_existing=True)
    img.colorspace_settings.name = "sRGB"
    img.reload()

    base_node = None
    bsdf = next((n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
    if bsdf:
        base_input = bsdf.inputs.get("Base Color")
        for link in mat.node_tree.links:
            if link.to_socket == base_input:
                base_node = link.from_node
                break

    if base_node is None:
        for node in mat.node_tree.nodes:
            if node.type == "TEX_IMAGE" and node.label == "BaseColor":
                base_node = node
                break

    if base_node is None:
        base_node = next(n for n in mat.node_tree.nodes if n.type == "TEX_IMAGE")

    base_node.image = img
    mat.node_tree.update_tag()

    for area in bpy.context.screen.areas:
        if area.type == "VIEW_3D":
            area.spaces.active.shading.type = "MATERIAL"

    print(f"✓ Base color → {ARCHON_BASE}")


generate()
apply_materials()
swap_base_color()

save_path = os.path.join(PROJECT, "public/models/archon-vial-edit.blend")
bpy.ops.wm.save_as_mainfile(filepath=save_path)
print(f"✓ Full Archon label applied — saved: {save_path}")
