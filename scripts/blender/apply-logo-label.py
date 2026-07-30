"""
Archon vial — Step 4a: apply logo-only label to base color map.
Run after apply-vial-textures.py (or on archon-vial-edit.blend).
"""

import bpy
import os

PROJECT = "/Users/jaleahroscoe/Desktop/Archon Website"
TEX_DIR = os.path.join(PROJECT, "public/models/archon-vial-textures")
LOGO_BASE = os.path.join(TEX_DIR, "Vial_BaseColor_logo.png")
FALLBACK_BASE = os.path.join(TEX_DIR, "Vial_BaseColor.png")


def apply_logo_basecolor():
    vial = bpy.data.objects.get("Vial")
    if not vial or not vial.data.materials:
        raise RuntimeError("Open archon-vial-edit.blend or run apply-vial-textures.py first.")

    mat = vial.data.materials[0]
    if not mat.use_nodes:
        raise RuntimeError("Vial material has no nodes.")

    base_path = LOGO_BASE if os.path.exists(LOGO_BASE) else FALLBACK_BASE
    img = bpy.data.images.load(base_path, check_existing=True)
    img.colorspace_settings.name = "sRGB"

    for node in mat.node_tree.nodes:
        if node.type == "TEX_IMAGE" and node.image:
            name = node.image.name.lower()
            if "basecolor" in name or "base_color" in name or node.image.filepath.endswith(
                "Vial_BaseColor.png"
            ):
                node.image = img
                print(f"✓ Swapped base color → {os.path.basename(base_path)}")
                return
            # First image node is base color in our setup
            if node.label == "" and "metallic" not in (node.image.name or "").lower():
                first = node

    # Fallback: first TEX_IMAGE node in apply-vial-textures layout
    tex_nodes = [n for n in mat.node_tree.nodes if n.type == "TEX_IMAGE"]
    if tex_nodes:
        tex_nodes[0].image = img
        print(f"✓ Applied logo base color to first texture node")
    else:
        raise RuntimeError("No image texture node found.")


def main():
    # Generate logo texture if missing
    logo_path = LOGO_BASE
    if not os.path.exists(logo_path):
        script = os.path.join(PROJECT, "scripts/blender/generate-logo-label-texture.py")
        print("Generating logo-only label texture…")
        import subprocess
        import sys

        blender = "/Applications/Blender.app/Contents/MacOS/Blender"
        subprocess.run(
            [blender, "--background", "--python", script],
            check=True,
        )

    apply_logo_basecolor()

    save_path = os.path.join(PROJECT, "public/models/archon-vial-edit.blend")
    bpy.ops.wm.save_as_mainfile(filepath=save_path)
    print(f"✓ Step 4a complete — logo-only label applied. Saved: {save_path}")


if __name__ == "__main__":
    main()
