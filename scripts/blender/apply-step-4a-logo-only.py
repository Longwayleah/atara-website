"""
Archon vial — Step 4a: logo-only label (Archon A on white label).
Blender → Scripting → Open → Run Script (▶)
"""

import bpy
import os

PROJECT = "/Users/jaleahroscoe/Desktop/Archon Website"
SCRIPT_DIR = os.path.join(PROJECT, "scripts/blender")
TEX_DIR = os.path.join(PROJECT, "public/models/archon-vial-textures")
LOGO_BASE = os.path.join(TEX_DIR, "Vial_BaseColor_logo.png")


def apply_pbr():
    path = os.path.join(SCRIPT_DIR, "apply-vial-textures.py")
    exec(compile(open(path).read(), path, "exec"), {"__name__": "__main__"})


def generate_logo_texture():
    path = os.path.join(SCRIPT_DIR, "generate-logo-label-texture.py")
    exec(compile(open(path).read(), path, "exec"), {"__name__": "__main__"})


def apply_logo_to_material():
    vial = bpy.data.objects.get("Vial")
    if not vial:
        raise RuntimeError("No Vial object — run apply-vial-textures.py first.")

    mat = vial.data.materials[0]
    img = bpy.data.images.load(LOGO_BASE, check_existing=True)
    img.colorspace_settings.name = "sRGB"
    img.reload()

    bsdf = None
    for node in mat.node_tree.nodes:
        if node.type == "BSDF_PRINCIPLED":
            bsdf = node
            break

    base_node = None
    if bsdf:
        base_input = bsdf.inputs.get("Base Color")
        if base_input:
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
        for node in mat.node_tree.nodes:
            if node.type == "TEX_IMAGE":
                base_node = node
                break

    if base_node is None:
        raise RuntimeError("No image texture node found on Vial material.")

    base_node.image = img
    mat.node_tree.update_tag()
    print(f"✓ Base color node now uses: {LOGO_BASE}")

    for area in bpy.context.screen.areas:
        if area.type == "VIEW_3D":
            area.spaces.active.shading.type = "MATERIAL"


# Always regenerate logo PNG, rebuild material, apply logo base
generate_logo_texture()
apply_pbr()
apply_logo_to_material()

save_path = os.path.join(PROJECT, "public/models/archon-vial-edit.blend")
bpy.ops.wm.save_as_mainfile(filepath=save_path)
print(f"✓ Step 4a saved: {save_path}")
