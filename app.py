from flask import Flask, request, send_file
from flask_cors import CORS
from models.pdf_generator import generate_pdf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for testing

@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    shape = data.get("shape")
    size1 = int(data.get("size1"))
    size2 = int(data.get("size2") or 0)
    color = data.get("color")

    # Generate PDF
    pdf_path = generate_pdf(shape, size1, size2, color)

    return send_file(pdf_path, as_attachment=True)

@app.route('/preview', methods=['POST'])
def preview():
    data = request.get_json()
    shape = data.get("shape")
    size1 = int(data.get("size1"))
    size2 = int(data.get("size2") or 0)
    color = data.get("color")

    # Generate PDF for preview
    pdf_path = generate_pdf(shape, size1, size2, color, preview=True)

    return send_file(pdf_path, as_attachment=False)

if __name__ == "__main__":
    app.run(debug=True)