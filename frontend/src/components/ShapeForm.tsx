import React from "react";

interface ShapeFormProps {
    shape: string;
    setShape: (value: string) => void;
    size1: number;
    setSize1: (value: number) => void;
    size2: number;
    setSize2: (value: number) => void;
    color: string;
    setColor: (value: string) => void;
    generatePDF: (
        data: { shape: string; size1: number; size2: number; color: string },
        action: string
    ) => void;
}

const ShapeForm: React.FC<ShapeFormProps> = ({
    shape,
    setShape,
    size1,
    setSize1,
    size2,
    setSize2,
    color,
    setColor,
    generatePDF,
}) => {
    const handleSubmit = (action: string) => {
        const data = { shape, size1, size2, color };
        generatePDF(data, action);
    };

    return (
        <form>
            <label>Shape:</label>
            <select value={shape} onChange={(e) => setShape(e.target.value)}>
                <option value="rectangle">Rectangle</option>
                <option value="circle">Circle</option>
                <option value="triangle">Triangle</option>
            </select>
            <br />

            <label>
                {shape === "circle" ? "Radius:" : shape === "triangle" ? "Base:" : "Width:"}
            </label>
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
    );
};

export default ShapeForm;