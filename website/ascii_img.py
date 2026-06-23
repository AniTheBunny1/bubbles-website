from PIL import Image
import numpy as np

img = Image.open('public/Subject.png').convert("RGBA")
# Resize to 50x50 to print an ascii art
img_small = img.resize((40, 80))
data = np.array(img_small)
alpha = data[:, :, 3]

for row in alpha:
    line = "".join(["#" if a > 50 else "." for a in row])
    print(line)
