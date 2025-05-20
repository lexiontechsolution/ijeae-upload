import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./Components/Upload";
import Publications from "./Components/Publications";
import PDFViewer from "./Components/PDFViewer";
import UpdatePublication from "./Components/UpdatePublication";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/view-pdf/:id" element={<PDFViewer />} />
        <Route path="/update-publication/:id" element={<UpdatePublication />} />
      </Routes>
    </Router>
  );
};

export default App;
