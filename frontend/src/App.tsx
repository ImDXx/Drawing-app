import React, { useState } from "react";
import ShapeForm from "./components/ShapeForm";
import ShapeCanvas from "./components/ShapeCanvas";
import axios from "axios";

const App: React.FC = () => {
  const [shape, setShape] = useState("rectangle");
  const [size1, setSize1] = useState(100);
  const [size2, setSize2] = useState(100);
  const [color, setColor] = useState("blue");

  const handleSubmit = async (action: string) => {
    const data = { shape, size1, size2, color };
    const endpoint = action === "preview" ? "http://127.0.0.1:5000/preview" : "http://127.0.0.1:5000/";
    try {
      const response = await axios.post(endpoint, data, {
        responseType: "blob",
      });
      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));

      if (action === "preview") {
        window.open(fileURL, "_blank");
      } else {
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "drawing_report.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="container">
      <ShapeForm
        shape={shape}
        setShape={setShape}
        size1={size1}
        setSize1={setSize1}
        size2={size2}
        setSize2={setSize2}
        color={color}
        setColor={setColor}
        handleSubmit={handleSubmit}
      />
      <ShapeCanvas shape={shape} size1={size1} size2={size2} color={color} />
    </div>
  );
};

export default App;