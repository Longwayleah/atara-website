"""
Generate full Archon navy label on TurboSquid base color map.
Output: public/models/archon-vial-textures/Vial_BaseColor_archon.png
"""

import bpy
import os
import numpy as np

PROJECT = "/Users/jaleahroscoe/Desktop/Archon Website"
TEX_DIR = os.path.join(PROJECT, "public/models/archon-vial-textures")
BASE_PATH = os.path.join(TEX_DIR, "Vial_BaseColor.png")
TRANS_PATH = os.path.join(TEX_DIR, "Vial_Transmission.png")
LABEL_PATH = os.path.join(PROJECT, "public/models/archon-vial-label.png")
OUT_PATH = os.path.join(TEX_DIR, "Vial_BaseColor_archon.png")

LABEL_INSET = 0.88
# UV panel is tall; rotate label so text reads left-to-right on the vial.
# k=1 = horizontal on vial; flip vertical so logo sits near cap, text near base.
LABEL_ROTATION = 1
LABEL_FLIP_VERTICAL = True
LABEL_FLIP_HORIZONTAL = True


def img_to_array(img):
    w, h = img.size
    return np.array(img.pixels[:], dtype=np.float32).reshape(h, w, 4)


def array_to_img(arr, img):
    img.pixels[:] = arr.reshape(-1).tolist()


def label_paper_mask(base, trans):
    """TurboSquid label islands are ~0.768 opaque grey, not white."""
    return (
        (base[..., 0] > 0.755)
        & (base[..., 0] < 0.785)
        & (trans < 0.05)
    )


def find_label_panels(base, trans):
    """Return tight bounds for each label panel on the UV sheet."""
    paper = label_paper_mask(base, trans)
    h, w = paper.shape

    probe = paper[:, 3000:3800].sum(axis=1)
    active = np.where(probe > 200)[0]
    if len(active) == 0:
        return [(w // 4, h // 4, 3 * w // 4, h // 2)]

    bands = []
    start = int(active[0])
    for i in range(len(active) - 1):
        if active[i + 1] - active[i] > 50:
            bands.append((start, int(active[i])))
            start = int(active[i + 1])
    bands.append((start, int(active[-1])))

    panels = []
    for y0, y1 in bands:
        sub = paper[y0 : y1 + 1]
        ph = y1 - y0 + 1
        col_fill = sub.sum(axis=0) / ph
        xs = np.where(col_fill > 0.5)[0]
        if len(xs) == 0:
            continue

        lx0, lx1 = int(xs.min()), int(xs.max())
        row_fill = sub[:, lx0 : lx1 + 1].sum(axis=1) / (lx1 - lx0 + 1)
        ys = np.where(row_fill > 0.5)[0]
        if len(ys) == 0:
            continue

        panels.append((lx0, y0 + int(ys.min()), lx1, y0 + int(ys.max())))

    if not panels:
        return [(2987, 0, 3777, 2413)]

    # Hero label lives on the largest panel (upper strip on the vial body).
    panels.sort(key=lambda p: (p[3] - p[1]) * (p[2] - p[0]), reverse=True)
    return panels[:1]


def resize_bilinear(arr, out_h, out_w):
    in_h, in_w = arr.shape[:2]
    y = np.linspace(0, in_h - 1, out_h).astype(np.float32)
    x = np.linspace(0, in_w - 1, out_w).astype(np.float32)
    y0 = np.floor(y).astype(int)
    x0 = np.floor(x).astype(int)
    y1 = np.minimum(y0 + 1, in_h - 1)
    x1 = np.minimum(x0 + 1, in_w - 1)
    wy = (y - y0)[:, None, None]
    wx = (x - x0)[None, :, None]

    c00 = arr[y0[:, None], x0[None, :]]
    c10 = arr[y1[:, None], x0[None, :]]
    c01 = arr[y0[:, None], x1[None, :]]
    c11 = arr[y1[:, None], x1[None, :]]
    return (1 - wy) * (1 - wx) * c00 + wy * (1 - wx) * c10 + (1 - wy) * wx * c01 + wy * wx * c11


def fit_label_in_box(label, box_h, box_w):
    in_h, in_w = label.shape[:2]
    target_h = max(1, int(box_h * LABEL_INSET))
    target_w = max(1, int(box_w * LABEL_INSET))
    scale = min(target_w / in_w, target_h / in_h)
    fit_h = max(1, int(in_h * scale))
    fit_w = max(1, int(in_w * scale))
    fitted = resize_bilinear(label, fit_h, fit_w)
    y0 = (box_h - fit_h) // 2
    x0 = (box_w - fit_w) // 2
    return fitted, y0, x0, fit_h, fit_w


def stamp_label(out, paper, label, lx0, ly0, lx1, ly1):
    box_h = ly1 - ly0 + 1
    box_w = lx1 - lx0 + 1
    fitted, fy0, fx0, fh, fw = fit_label_in_box(label, box_h, box_w)

    region = out[ly0 : ly1 + 1, lx0 : lx1 + 1]
    paper_sub = paper[ly0 : ly1 + 1, lx0 : lx1 + 1]

    y1, y2 = fy0, fy0 + fh
    x1, x2 = fx0, fx0 + fw
    target = region[y1:y2, x1:x2]
    mask = paper_sub[y1:y2, x1:x2]

    for c in range(3):
        target[..., c] = np.where(mask, fitted[..., c], target[..., c])

    region[y1:y2, x1:x2] = target
    out[ly0 : ly1 + 1, lx0 : lx1 + 1] = region
    return box_w, box_h


def main():
    base = img_to_array(bpy.data.images.load(BASE_PATH, check_existing=True))
    trans = img_to_array(bpy.data.images.load(TRANS_PATH, check_existing=True))[..., 0]
    label = img_to_array(bpy.data.images.load(LABEL_PATH, check_existing=True))
    if LABEL_ROTATION:
        label = np.rot90(label, k=LABEL_ROTATION)
    if LABEL_FLIP_VERTICAL:
        label = np.flipud(label)
    if LABEL_FLIP_HORIZONTAL:
        label = np.fliplr(label)
    paper = label_paper_mask(base, trans)

    out = base.copy()
    panels = find_label_panels(base, trans)

    for lx0, ly0, lx1, ly1 in panels:
        box_w, box_h = stamp_label(out, paper, label, lx0, ly0, lx1, ly1)
        print(f"Label panel: ({lx0},{ly0})-({lx1},{ly1}) = {box_w}x{box_h}px")

    h, w = out.shape[:2]
    out_img = bpy.data.images.new("Vial_BaseColor_archon", w, h, alpha=True)
    array_to_img(out, out_img)
    out_img.filepath_raw = OUT_PATH
    out_img.file_format = "PNG"
    out_img.save(filepath=OUT_PATH)
    print(f"✓ Saved: {OUT_PATH}")


if __name__ == "__main__":
    main()
