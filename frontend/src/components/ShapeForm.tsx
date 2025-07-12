import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ShapeForm: React.FC = () => {
    const [shape, setShape] = useState("rectangle");
    const [size1, setSize1] = useState(100);
    const [size2, setSize2] = useState(100);
    const [color, setColor] = useState("blue");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Function to draw the shape on the canvas
    const drawShape = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set the fill color based on the selected color
        if (color === "blue") {
            ctx.fillStyle = "rgb(128, 204, 255)"; // Matches Python's light blue (0.5, 0.8, 1)
        } else if (color === "red") {
            ctx.fillStyle = "rgb(255, 153, 153)"; // Matches Python's light red (1, 0.6, 0.6)
        }

        // Draw the selected shape
        if (shape === "rectangle") {
            ctx.fillRect(
                (canvas.width - size1) / 2,
                (canvas.height - size2) / 2,
                size1,
                size2
            );
        } else if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, size1, 0, 2 * Math.PI);
            ctx.fill();
        } else if (shape === "triangle") {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2 - size2 / 2);
            ctx.lineTo(canvas.width / 2 - size1 / 2, canvas.height / 2 + size2 / 2);
            ctx.lineTo(canvas.width / 2 + size1 / 2, canvas.height / 2 + size2 / 2);
            ctx.closePath();
            ctx.fill();
        }
    };

    // Redraw the shape whenever the inputs change
    useEffect(() => {
        drawShape();
    }, [shape, size1, size2, color]);

    const handleSubmit = async (action: string) => {
        const data = { shape, size1, size2, color };
        const endpoint = action === "preview" ? "http://127.0.0.1:5000/preview" : "http://127.0.0.1:5000/";
        try {
            const response = await axios.post(endpoint, data, {
                responseType: "blob", // Ensure the response is treated as binary data
            });
            const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));

            if (action === "preview") {
                // Open the PDF in a new tab for preview
                window.open(fileURL, "_blank");
            } else {
                // Trigger download for "Generate PDF"
                const link = document.createElement("a");
                link.href = fileURL;
                link.download = "drawing_report.pdf"; // Set the filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div>
            <h2>Draw Shape & Export as PDF</h2>
            <form>
                <label>Shape:</label>
                <select value={shape} onChange={(e) => setShape(e.target.value)}>
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                </select>
                <br />

                <label>{shape === "circle" ? "Radius:" : "Width:"}</label>
                <input
                    type="number"
                    value={size1}
                    onChange={(e) => setSize1(Number(e.target.value))}
                    required
                />
                <br />

                {shape !== "circle" && (
                    <>
                        <label>Height:</label>
                        <input
                            type="number"
                            value={size2}
                            onChange={(e) => setSize2(Number(e.target.value))}
                            required
                        />
                        <br />
                    </>
                )}

                <label>Fill Color:</label>
                <select value={color} onChange={(e) => setColor(e.target.value)}>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                </select>
                <br />

                <button type="button" onClick={() => handleSubmit("download")}>
                    Generate PDF (Download)
                </button>
                <button type="button" onClick={() => handleSubmit("preview")}>
                    Preview (Without downloading)
                </button>
            </form>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                style={{
                    border: "1px solid black",
                    marginTop: "20px",
                }}
            ></canvas>
        </div>
    );
};

export default ShapeForm;