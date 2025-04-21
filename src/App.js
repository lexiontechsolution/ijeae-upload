import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./Components/Upload";
import Publications from "./Components/Publications";
import PDFViewer from "./Components/PDFViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/view-pdf/:id" element={<PDFViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
