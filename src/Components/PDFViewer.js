import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PDFViewer = () => {
  const { id } = useParams(); // Get ID from URL
  const [pdfURL, setPdfURL] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await fetch(
          `http://eeman.in:15002/publications/${id}/pdf`
        );
        if (!response.ok) throw new Error("Failed to fetch PDF.");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfURL(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, [id]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {pdfURL ? (
        <iframe
          src={pdfURL}
          width="100%"
          height="100%"
          title="PDF Viewer"
        ></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
