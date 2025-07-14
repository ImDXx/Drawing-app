import { useCallback } from "react";
import axios from "axios";

const usePDFGeneration = () => {
    const generatePDF = useCallback(
        async (
            data: { shape: string; size1: number; size2: number; color: string },
            action: string
        ) => {
            const endpoint = "http://127.0.0.1:5000/generate";
            try {
                const response = await axios.post(endpoint, { ...data, action }, {
                    responseType: "blob",
                });
                const fileURL = window.URL.createObjectURL(
                    new Blob([response.data], { type: "application/pdf" })
                );

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
        },
        []
    );

    return { generatePDF };
};

export default usePDFGeneration;