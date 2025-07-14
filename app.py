from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from models.pdf_generator import generate_pdf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for testing

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        shape = data.get("shape")
        size1 = int(data.get("size1"))
        size2 = int(data.get("size2") or 0)
        color = data.get("color")
        action = data.get("action")

        # Validate input
        if not shape or not color or size1 <= 0 or (shape != "circle" and size2 <= 0):
            return jsonify({"error": "Invalid input"}), 400

        # Generate PDF
        pdf_path = generate_pdf(shape, size1, size2, color, preview=(action == "preview"))

        # Return file or success response
        if action == "preview":
            return send_file(pdf_path, as_attachment=False)
        else:
            return send_file(pdf_path, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)