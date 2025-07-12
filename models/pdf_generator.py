from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

output_path = "generated/drawing_report.pdf"

def generate_pdf(shape, size1, size2, color, preview=False):
    # Page dimensions for letter size
    page_width, page_height = letter

    # Calculate center position
    x = (page_width - size1) / 2
    y = (page_height - size2) / 2

    os.makedirs("generated", exist_ok=True)
    c = canvas.Canvas(output_path, pagesize=letter)

    c.setTitle(shape + (" Preview" if preview else ""))

    # Set fill color
    if color == "blue":
        c.setFillColorRGB(0.5, 0.8, 1)  # Light blue
    elif color == "red":
        c.setFillColorRGB(1, 0.6, 0.6)  # Light red

    # Draw shapes
    if shape == "rectangle":
        c.rect(x, y, size1, size2, fill=True)
        c.drawString(50, 750, f"Rectangle with width = {size1} and height = {size2}")
        c.drawString(50, 730, f"Area = {size1 * size2}")
        c.drawString(50, 710, f"Perimeter = {2 * (size1 + size2)}")
    elif shape == "circle":
        radius = size1
        x = page_width / 2
        y = page_height / 2
        c.circle(x, y, radius, fill=True)
        c.drawString(50, 750, f"Circle with radius = {radius}")
        c.drawString(50, 730, f"Area = {round(3.14 * radius ** 2, 2)}")
        c.drawString(50, 710, f"Perimeter = {round(2 * 3.14 * radius, 2)}")
    elif shape == "triangle":
        base = size1
        height = size2
        path = c.beginPath()
        path.moveTo(x, y)
        path.lineTo(x + base, y)
        path.lineTo(x + base / 2, y + height)
        path.close()
        c.drawPath(path, fill=True)
        c.drawString(50, 750, f"Triangle with base = {base} and height = {height}")
        c.drawString(50, 730, f"Area = {round(0.5 * base * height, 2)}")
        c.drawString(50, 710, f"Perimeter = {round(base + 2 * (height ** 2 + (base / 2) ** 2) ** 0.5, 2)}")

    c.save()
    return output_path