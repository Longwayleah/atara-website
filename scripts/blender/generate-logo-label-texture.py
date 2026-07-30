"""
Generate logo-only label on the TurboSquid base color map.
Output: public/models/archon-vial-textures/Vial_BaseColor_logo.png
"""

import bpy
import os
import numpy as np

PROJECT = "/Users/jaleahroscoe/Desktop/Archon Website"
TEX_DIR = os.path.join(PROJECT, "public/models/archon-vial-textures")
BASE_PATH = os.path.join(TEX_DIR, "Vial_BaseColor.png")
LOGO_SRC = os.path.join(PROJECT, "public/models/archon-vial-label.png")
OUT_PATH = os.path.join(TEX_DIR, "Vial_BaseColor_logo.png")

NAVY = np.array([11 / 255, 31 / 255, 58 / 255], dtype=np.float32)


def img_to_array(img):
    w, h = img.size
    return np.array(img.pixels[:], dtype=np.float32).reshape(h, w, 4)


def array_to_img(arr, img):
    img.pixels[:] = arr.reshape(-1).tolist()


def find_upper_label_panel(base):
    """TurboSquid label = two white panels; logo goes on the UPPER panel."""
    h, w, _ = base.shape
    lum = base[..., 0] * 0.299 + base[..., 1] * 0.587 + base[..., 2] * 0.114
    neutral = (np.abs(base[..., 0] - base[..., 1]) < 0.1) & (
        np.abs(base[..., 1] - base[..., 2]) < 0.1
    )
    mask = (lum > 0.62) & neutral

    row_counts = mask.sum(axis=1)
    active_rows = np.where(row_counts > w * 0.15)[0]
    if len(active_rows) == 0:
        return w // 4, h // 3, 3 * w // 4, h // 2

    # Split at largest gap (divider line between upper/lower panels)
    gaps = np.diff(active_rows)
    if len(gaps) > 0 and gaps.max() > 5:
        split_at = active_rows[np.argmax(gaps) + 1]
        upper_rows = active_rows[active_rows < split_at]
    else:
        upper_rows = active_rows[: len(active_rows) // 2]

    ys = upper_rows
    xs = np.where(mask[ys][:, :])[1]
    if len(xs) == 0:
        return w // 4, h // 3, 3 * w // 4, h // 2

    return xs.min(), ys.min(), xs.max(), ys.max()


def main():
    base_img = bpy.data.images.load(BASE_PATH, check_existing=True)
    logo_img = bpy.data.images.load(LOGO_SRC, check_existing=True)

    base = img_to_array(base_img)
    h, w, _ = base.shape

    lw, lh = logo_img.size
    cx0, cy0 = int(lw * 0.22), int(lh * 0.06)
    cx1, cy1 = int(lw * 0.78), int(lh * 0.44)
    logo_crop = img_to_array(logo_img)[cy0:cy1, cx0:cx1]

    lx0, ly0, lx1, ly1 = find_upper_label_panel(base)
    label_w, label_h = lx1 - lx0, ly1 - ly0

    target_w = int(label_w * 0.42)
    ch, cw = logo_crop.shape[:2]
    target_h = int(ch * (target_w / cw))
    max_h = int(label_h * 0.55)
    if target_h > max_h:
        target_h = max_h
        target_w = int(cw * (target_h / ch))

    logo_rgb = logo_crop[..., :3]
    logo_white = (logo_rgb.min(axis=2) > 0.72).astype(np.float32)

    sy = np.linspace(0, ch - 1, target_h).astype(int)
    sx = np.linspace(0, cw - 1, target_w).astype(int)
    stamp = logo_white[np.ix_(sy, sx)]

    pos_x = lx0 + (label_w - target_w) // 2
    pos_y = ly0 + (label_h - target_h) // 2

    out = base.copy()
    y1, y2 = pos_y, pos_y + target_h
    x1, x2 = pos_x, pos_x + target_w
    region = out[y1:y2, x1:x2, :3]
    alpha = stamp[..., None]
    out[y1:y2, x1:x2, :3] = region * (1 - alpha) + NAVY * alpha

    navy_count = int((stamp > 0.5).sum())
    print(f"Label panel: ({lx0},{ly0})-({lx1},{ly1}), logo stamp: {navy_count} px")

    out_img = bpy.data.images.new("Vial_BaseColor_logo", w, h, alpha=True)
    array_to_img(out, out_img)
    out_img.filepath_raw = OUT_PATH
    out_img.file_format = "PNG"
    out_img.save(filepath=OUT_PATH)
    print(f"✓ Saved: {OUT_PATH}")


if __name__ == "__main__":
    main()
