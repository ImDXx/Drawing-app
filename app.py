from flask import Flask, render_template, request, send_file
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

app = Flask(__name__)
output_path = "generated/drawing_report.pdf"

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        shape = request.form.get("shape")
        size1 = int(request.form.get("size1"))
        size2 = int(request.form.get("size2") or 0)  # Only used for rectangle
        color = request.form.get("color")

        # Page dimensions for letter size
        page_width, page_height = letter

        # Calculate center position, x y for drawing from middle of the page
        x = (page_width - size1) / 2
        y = (page_height - size2) / 2

        os.makedirs("generated", exist_ok=True)
        c = canvas.Canvas(output_path, pagesize=letter)

        c.setTitle(shape)

        if color == "blue":
            c.setFillColorRGB(0.5, 0.8, 1)  # Light blue
        elif color == "red":
            c.setFillColorRGB(1, 0.6, 0.6) # Light red

        if shape == "rectangle":
            c.rect(x, y, size1, size2, fill=True)
            c.drawString(50, 750, f"Rectangle with width = {size1} and height = {size2}")
            c.drawString(50, 730, f"Area = {size1 * size2}")  # Area
            c.drawString(50, 710, f"Perimeter = {2 * (size1 + size2)}")  # Perimeter
        elif shape == "circle":
            radius = size1
            x = page_width / 2
            y = page_height / 2
            c.circle(x, y, radius, fill=True)
            c.drawString(50, 750, f"Circle: Centered at x={x}, y={y}, radius={radius}")
        
        elif shape == "triangle":
            base = size1  # Base
            height = size2  # Height

            # Create a path for the triangle
            path = c.beginPath()
            path.moveTo(x, y)  # Bottom-left vertex
            path.lineTo(x + base, y)  # Bottom-right vertex
            path.lineTo(x + base / 2, y + height)  # Top vertex
            path.close()  # Close

            # Draw the triangle
            c.drawPath(path, fill=True)

            # Add text for dimensions and area
            c.drawString(50, 750, f"Triangle with base = {base} and height = {height}")
            c.drawString(50, 730, f"Area = {round(0.5 * base * height, 2)}")  # Area calculation

        c.save()
        return send_file(output_path, as_attachment=True)

    return render_template('index.html')

# Same functionality as above, only difference is as_attachment=false
@app.route('/preview', methods=['POST'])
def preview():
    shape = request.form.get("shape")
    size1 = int(request.form.get("size1"))
    size2 = int(request.form.get("size2") or 0)  # Only used for rectangle
    color = request.form.get("color")

    # Page dimensions for letter size
    page_width, page_height = letter

    # Calculate center position
    x = (page_width - size1) / 2
    y = (page_height - size2) / 2

    os.makedirs("generated", exist_ok=True)
    c = canvas.Canvas(output_path, pagesize=letter)

    c.setTitle(shape + " Preview")

    if color == "blue":
            c.setFillColorRGB(0.5, 0.8, 1)  # Light blue
    elif color == "red":
            c.setFillColorRGB(1, 0.6, 0.6) # Light red

    if shape == "rectangle":
        c.rect(x, y, size1, size2, fill=True)
        c.drawString(50, 750, f"Rectangle with width = {size1} and height = {size2}")
        c.drawString(50, 730, f"Area = {size1 * size2}")  # Area 
        c.drawString(50, 710, f"Perimeter = {2 * (size1 + size2)}")  # Perimeter
    elif shape == "circle":
        radius = size1
        x = page_width / 2
        y = page_height / 2
        c.circle(x, y, radius, fill=True)
        c.drawString(50, 750, f"Circle with radius = {radius}")
        c.drawString(50, 730, f"Area = {round(3.14 * radius **2, 2)}") # Areal Calculation
        c.drawString(50, 710, f"Perimeter = {round(2 * 3.14 * radius, 2)}") # Perimeter Calc

    elif shape == "triangle":
        base = size1  # Base
        height = size2  # Height

        # Create a path for the triangle
        path = c.beginPath()
        path.moveTo(x, y)  # Bottom-left vertex
        path.lineTo(x + base, y)  # Bottom-right vertex
        path.lineTo(x + base / 2, y + height)  # Top vertex
        path.close()  # Close

        # Draw the triangle
        c.drawPath(path, fill=True)

        # Add text for dimensions and area
        c.drawString(50, 750, f"Triangle with base = {base} and height = {height}")
        c.drawString(50, 730, f"Area = {round(0.5 * base * height, 2)}")  # Area calculation

    c.save()
    return send_file(output_path, as_attachment=False) # To review without downloading

if __name__ == "__main__":
    app.run(debug=True)