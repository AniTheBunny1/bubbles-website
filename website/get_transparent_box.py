from PIL import Image
import numpy as np

img = Image.open('public/Subject.png').convert("RGBA")
data = np.array(img)

# Find pixels where alpha is 0
alpha = data[:, :, 3]
transparent_pixels = np.where(alpha == 0)

if len(transparent_pixels[0]) > 0:
    min_y = np.min(transparent_pixels[0])
    max_y = np.max(transparent_pixels[0])
    min_x = np.min(transparent_pixels[1])
    max_x = np.max(transparent_pixels[1])
    
    height, width = alpha.shape
    
    print(f"Top: {min_y / height * 100:.2f}%")
    print(f"Bottom: {(height - max_y) / height * 100:.2f}%")
    print(f"Left: {min_x / width * 100:.2f}%")
    print(f"Right: {(width - max_x) / width * 100:.2f}%")
else:
    print("No fully transparent pixels found.")
