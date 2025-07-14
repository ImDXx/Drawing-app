import React, { useState } from "react";
import ShapeForm from "./components/ShapeForm";
import ShapeCanvas from "./components/ShapeCanvas";
import usePDFGeneration from "./hooks/usePDFGeneration";

const App: React.FC = () => {
  const [shape, setShape] = useState("rectangle");
  const [size1, setSize1] = useState(100);
  const [size2, setSize2] = useState(100);
  const [color, setColor] = useState("blue");

  const { generatePDF } = usePDFGeneration();

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
        generatePDF={generatePDF}
      />
      <ShapeCanvas shape={shape} size1={size1} size2={size2} color={color} />
    </div>
  );
};

export default App;