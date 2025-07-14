import React, { useEffect, useRef } from "react";

interface ShapeCanvasProps {
    shape: string;
    size1: number;
    size2: number;
    color: string;
}

const ShapeCanvas: React.FC<ShapeCanvasProps> = ({ shape, size1, size2, color }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

    useEffect(() => {
        drawShape();
    }, [shape, size1, size2, color]);

    return <canvas ref={canvasRef} width={400} height={400} style={{ border: "1px solid black" }}></canvas>;
};

export default ShapeCanvas;