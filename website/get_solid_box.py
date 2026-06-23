from PIL import Image
import numpy as np

img = Image.open('public/Subject.png').convert("RGBA")
data = np.array(img)
alpha = data[:, :, 3]

solid_pixels = np.where(alpha > 10)

if len(solid_pixels[0]) > 0:
    min_y = np.min(solid_pixels[0])
    max_y = np.max(solid_pixels[0])
    min_x = np.min(solid_pixels[1])
    max_x = np.max(solid_pixels[1])
    
    height, width = alpha.shape
    
    print(f"Top padding: {min_y / height * 100:.2f}%")
    print(f"Bottom padding: {(height - max_y) / height * 100:.2f}%")
    print(f"Left padding: {min_x / width * 100:.2f}%")
    print(f"Right padding: {(width - max_x) / width * 100:.2f}%")
    print(f"Screen width roughly: {((max_x - min_x) / width) * 100:.2f}%")
