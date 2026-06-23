from PIL import Image
import numpy as np

img = Image.open('public/Subject.png').convert("RGBA")
data = np.array(img)
# The screen is transparent, so alpha == 0 inside the phone.
# We know the outside is also transparent, but the phone frame is solid.
# Let's look at the middle row of the image to find the left and right bezels.
height, width, _ = data.shape
middle_row = data[height // 2, :, 3]

# Find the first solid pixel from the left
left_bezel_start = -1
for i in range(width):
    if middle_row[i] > 100:
        left_bezel_start = i
        break

# Find the end of the left bezel (first transparent pixel after the bezel)
screen_start = -1
for i in range(left_bezel_start, width):
    if middle_row[i] < 100:
        screen_start = i
        break

# Find the first solid pixel from the right
right_bezel_start = -1
for i in range(width - 1, -1, -1):
    if middle_row[i] > 100:
        right_bezel_start = i
        break

# Find the end of the right bezel
screen_end = -1
for i in range(right_bezel_start, -1, -1):
    if middle_row[i] < 100:
        screen_end = i
        break

print(f"Left bezel starts at: {left_bezel_start} ({left_bezel_start/width*100:.2f}%)")
print(f"Screen starts at: {screen_start} ({screen_start/width*100:.2f}%)")
print(f"Screen ends at: {screen_end} ({(width-screen_end)/width*100:.2f}% from right)")
print(f"Right bezel ends at: {right_bezel_start} ({(width-right_bezel_start)/width*100:.2f}% from right)")

# Now let's do the middle column for top and bottom
middle_col = data[:, width // 2, 3]

top_bezel_start = -1
for i in range(height):
    if middle_col[i] > 100:
        top_bezel_start = i
        break

screen_top = -1
for i in range(top_bezel_start, height):
    if middle_col[i] < 100:
        screen_top = i
        break

bottom_bezel_start = -1
for i in range(height - 1, -1, -1):
    if middle_col[i] > 100:
        bottom_bezel_start = i
        break

screen_bottom = -1
for i in range(bottom_bezel_start, -1, -1):
    if middle_col[i] < 100:
        screen_bottom = i
        break

print(f"Top bezel starts at: {top_bezel_start} ({top_bezel_start/height*100:.2f}%)")
print(f"Screen starts at top: {screen_top} ({screen_top/height*100:.2f}%)")
print(f"Screen ends at bottom: {screen_bottom} ({(height-screen_bottom)/height*100:.2f}% from bottom)")

