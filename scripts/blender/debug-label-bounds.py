import bpy, numpy as np, os
T="/Users/jaleahroscoe/Desktop/Archon Website/public/models/archon-vial-textures"
img=bpy.data.images.load(os.path.join(T,"Vial_BaseColor.png"))
a=np.array(img.pixels[:],dtype=np.float32).reshape(img.size[1],img.size[0],4)
h,w=a.shape[:2]
# find two label panels - horizontal bands of high luminance
for y in range(h):
    row=a[y,:,0]
    if row.mean()>0.75:
        pass
# sample grid
print('size', w, h)
for frac_y in [0.3,0.4,0.5,0.6,0.7]:
    y=int(h*frac_y)
    r=a[y,w//2]
    print(f'center y={y} rgb={tuple(round(x,2) for x in r[:3])}")
