import React, { useState } from "react";
import axios from "axios";

const ShapeForm: React.FC = () => {
    const [shape, setShape] = useState("rectangle");
    const [size1, setSize1] = useState(0);
    const [size2, setSize2] = useState(0);
    const [color, setColor] = useState("blue");

    const handleSubmit = async (action: string) => {
        const data = { shape, size1, size2, color };
        const endpoint = action === "preview" ? "http://127.0.0.1:5000/preview" : "http://127.0.0.1:5000/";
        try {
            const response = await axios.post(endpoint, data, {
                responseType: "blob", // Ensure the response is treated as binary data
            });
            const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
            window.open(fileURL, "_blank"); // Open the PDF in a new tab
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
        </div>
    );
};

export default ShapeForm;