# Drawing-app
A python-based drawing app that allows users to create shapes (Rectangle, Circle, Triangle) and export as a PDF-file.

## Features
- **Real-Time Shape Rendering**: Draw shapes (Rectangle, Circle, Triangle) dynamically on the web.
- **Customizable Dimensions and Colors**: Choose dimensions and fill colors for the shapes.
- **PDF Export**: Generate a downloadable PDF report of the shapes.
- **Preview Mode**: Preview the PDF before downloading.

## Installation Backend
1. Clone the repository
```bash
git clone https://github.com/ImDXx/Drawing-app
```
2. Navigate to the project CD
```bash
cd drawing-app
```
3. Install dependencies
```bash
pip install flask reportlab
```
## Installation Frontend
1. Navigate to the frontend directory
```bash
cd frontend
```
2. Install Node.js dependencies
```bash
npm install
```

## Usage
1. Run the flask application
```bash
cd drawing-app
python app.py
```
2. Run the frontend
```bash
cd frontend
npm start
```
3. Open your browser and navigate to:
```bash
http://localhost:3000
```
## Technologies Used
- **Backend:** Python, Flask, ReportLab
- **Frontend:** React, TypeScript, Axios
- **Styling:** CSS