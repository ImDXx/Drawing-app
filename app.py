from flask import Flask, render_template, request, send_file
from models.pdf_generator import generate_pdf

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        shape = request.form.get("shape")
        size1 = int(request.form.get("size1"))
        size2 = int(request.form.get("size2") or 0)
        color = request.form.get("color")

        # Generate PDF
        pdf_path = generate_pdf(shape, size1, size2, color)

        return send_file(pdf_path, as_attachment=True)

    return render_template('index.html')

@app.route('/preview', methods=['POST'])
def preview():
    shape = request.form.get("shape")
    size1 = int(request.form.get("size1"))
    size2 = int(request.form.get("size2") or 0)
    color = request.form.get("color")

    # Generate PDF for preview
    pdf_path = generate_pdf(shape, size1, size2, color, preview=True)

    return send_file(pdf_path, as_attachment=False)

if __name__ == "__main__":
    app.run(debug=True)