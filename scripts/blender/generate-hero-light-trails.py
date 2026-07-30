"""
Archon hero — procedural light trails background.
Run in Blender: Scripting workspace → Open → Run Script (▶)

Outputs:
  public/images/hero-light-trails.png
  public/models/hero-light-trails.blend
"""

import bpy
import math
import os
import random
from mathutils import Euler, Vector

PROJECT = "/Users/jaleahroscoe/Desktop/Archon Website"
OUT_PNG = os.path.join(PROJECT, "public/images/hero-light-trails.png")
OUT_BLEND = os.path.join(PROJECT, "public/models/hero-light-trails.blend")

ROYAL = (0.27, 0.35, 0.50, 1.0)
SILVER = (0.55, 0.62, 0.74, 1.0)
WHITE = (0.74, 0.78, 0.86, 1.0)


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in bpy.data.meshes:
        if block.users == 0:
            bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0:
            bpy.data.materials.remove(block)


def setup_render():
    scene = bpy.context.scene
    engine = "BLENDER_EEVEE_NEXT" if hasattr(bpy.types, "BLENDER_EEVEE_NEXT") else "BLENDER_EEVEE"
    scene.render.engine = engine
    scene.render.resolution_x = 2560
    scene.render.resolution_y = 1440
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.film_transparent = False
    scene.render.filepath = OUT_PNG

    eevee = scene.eevee
    if hasattr(eevee, "use_bloom"):
        eevee.use_bloom = True
        eevee.bloom_threshold = 0.55
        eevee.bloom_intensity = 0.35
        eevee.bloom_radius = 8.0


def setup_world():
    world = bpy.data.worlds.new("ArchonHeroWorld")
    bpy.context.scene.world = world
    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links
    nodes.clear()
    out = nodes.new("ShaderNodeOutputWorld")
    bg = nodes.new("ShaderNodeBackground")
    bg.inputs["Color"].default_value = (0.98, 0.98, 0.99, 1.0)
    bg.inputs["Strength"].default_value = 1.0
    links.new(bg.outputs["Background"], out.inputs["Surface"])


def emission_material(name, color, strength):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    out = nodes.new("ShaderNodeOutputMaterial")
    emit = nodes.new("ShaderNodeEmission")
    emit.inputs["Color"].default_value = color
    emit.inputs["Strength"].default_value = strength
    links.new(emit.outputs["Emission"], out.inputs["Surface"])
    return mat


def make_trail(name, points, bevel, strength, color):
    curve = bpy.data.curves.new(name=name, type="CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = bevel
    curve.bevel_resolution = 8
    curve.fill_mode = "FULL"
    curve.use_fill_caps = True

    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for i, (co, handle_l, handle_r) in enumerate(points):
        bp = spline.bezier_points[i]
        bp.co = Vector(co)
        bp.handle_left_type = "FREE"
        bp.handle_right_type = "FREE"
        bp.handle_left = Vector(handle_l)
        bp.handle_right = Vector(handle_r)

    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(emission_material(f"{name}_Mat", color, strength))
    return obj


def build_trails():
    specs = [
        ("Trail_Primary", 0.022, 10.5, ROYAL, [
            ((2.8, -1.2, 2.1), (2.4, -0.6, 2.0), (3.1, -1.8, 2.2)),
            ((1.6, -0.2, 1.2), (2.1, -0.8, 1.5), (1.1, 0.3, 0.9)),
            ((0.2, 1.0, 0.1), (0.8, 0.4, 0.4), (-0.3, 1.5, -0.2)),
            ((-1.4, 2.2, -0.8), (-0.7, 1.7, -0.3), (-2.0, 2.7, -1.2)),
        ]),
        ("Trail_Secondary", 0.014, 7.0, SILVER, [
            ((3.1, -1.5, 2.3), (2.6, -0.9, 2.1), (3.5, -2.0, 2.5)),
            ((1.9, -0.5, 1.3), (2.4, -1.1, 1.6), (1.4, 0.1, 1.0)),
            ((0.5, 0.7, 0.2), (1.0, 0.2, 0.5), (0.0, 1.2, -0.1)),
            ((-1.0, 1.9, -0.6), (-0.4, 1.4, -0.2), (-1.6, 2.4, -1.0)),
        ]),
        ("Trail_Accent", 0.009, 5.0, WHITE, [
            ((2.5, -0.9, 1.9), (2.1, -0.4, 1.8), (2.8, -1.4, 2.0)),
            ((1.3, 0.0, 1.0), (1.8, -0.5, 1.2), (0.8, 0.5, 0.7)),
            ((-0.1, 1.1, -0.1), (0.4, 0.6, 0.2), (-0.6, 1.6, -0.4)),
            ((-1.7, 2.3, -0.9), (-1.1, 1.8, -0.5), (-2.3, 2.8, -1.3)),
        ]),
    ]

    for name, bevel, strength, color, points in specs:
        obj = make_trail(name, points, bevel, strength, color)
        obj.data.bevel_depth *= 2.2
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.convert(target="MESH")
        obj.select_set(False)


def build_bloom_and_sparkles():
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.35, location=(3.0, -1.8, 2.4))
    bloom = bpy.context.active_object
    bloom.name = "Bloom_Source"
    bloom.data.materials.append(emission_material("Bloom_Mat", (1.0, 1.0, 1.0, 1.0), 18.0))

    random.seed(7)
    for i in range(18):
        bpy.ops.mesh.primitive_ico_sphere_add(
            radius=0.018 + random.random() * 0.02,
            location=(
                2.6 - i * 0.22 + random.uniform(-0.08, 0.08),
                -1.0 + i * 0.11 + random.uniform(-0.06, 0.06),
                1.9 - i * 0.12 + random.uniform(-0.05, 0.05),
            ),
        )
        sparkle = bpy.context.active_object
        sparkle.name = f"Sparkle_{i:02d}"
        sparkle.data.materials.append(
            emission_material(
                f"Sparkle_Mat_{i:02d}",
                (0.92, 0.95, 1.0, 1.0),
                12.0 + random.random() * 8.0,
            )
        )


def frame_for_hero():
    for obj in bpy.data.objects:
        if obj.name.startswith(("Trail_", "Sparkle_", "Bloom_")):
            obj.scale = (1.8, 1.8, 1.8)
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.transform_apply(scale=True)
            obj.location.x += 0.8
            obj.location.z += 0.2

    cam_data = bpy.data.cameras.new("HeroCamera")
    cam = bpy.data.objects.new("HeroCamera", cam_data)
    bpy.context.collection.objects.link(cam)
    bpy.context.scene.camera = cam
    cam.location = Vector((-0.4, -7.5, 1.8))
    target = Vector((1.8, 0.0, 0.8))
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    cam.data.type = "PERSP"
    cam.data.lens = 42

    light_data = bpy.data.lights.new("Fill", type="AREA")
    light_data.energy = 55
    light_data.color = (0.96, 0.97, 1.0)
    light = bpy.data.objects.new("Fill", light_data)
    bpy.context.collection.objects.link(light)
    light.location = Vector((-2.0, 2.0, 3.0))
    light.rotation_euler = Euler((math.radians(50), 0.0, math.radians(-30)), "XYZ")


def main():
    os.makedirs(os.path.dirname(OUT_PNG), exist_ok=True)
    os.makedirs(os.path.dirname(OUT_BLEND), exist_ok=True)

    clear_scene()
    setup_render()
    setup_world()
    build_trails()
    build_bloom_and_sparkles()
    frame_for_hero()

    bpy.ops.wm.save_as_mainfile(filepath=OUT_BLEND)
    bpy.ops.render.render(write_still=True)
    print(f"Saved blend: {OUT_BLEND}")
    print(f"Rendered: {OUT_PNG}")


if __name__ == "__main__":
    main()
