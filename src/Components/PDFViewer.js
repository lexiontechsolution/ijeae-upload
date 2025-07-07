import React from "react";
import { useParams } from "react-router-dom";

const PDFViewer = () => {
  const { id } = useParams(); // Get ID from URL

  const pdfURL = `https://dev.dine360.ca/backend/publications/view-pdf/${id}`; // Use direct permanent URL

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src={pdfURL}
        width="100%"
        height="100%"
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export default PDFViewer;
