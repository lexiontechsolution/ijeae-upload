import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import "./Upload.css";
import sideimage from "../Assets/sideimage.svg";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [formData, setFormData] = useState({
    year: "",
    volume: "",
    issue: "",
    title: "",
    content: "",
    author: "",
    isSpecialIssue: "No",
    doi: "", 
    pdf: "",

  });

  const [pdfFile, setPdfFile] = useState(null);
  const [volumeError, setVolumeError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "volume") {
      const volumeRegex = /^\d+\(\d+\)$/; // Format: 1(1)
      if (!volumeRegex.test(value)) {
        setVolumeError("Please follow the format: X(Y) e.g., 1(1)");
      } else {
        setVolumeError("");
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
      setPdfFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (volumeError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const data = new FormData();
    data.append("year", formData.year);
    data.append("volume", formData.volume);
    data.append("issue", formData.issue);
    data.append("isSpecialIssue", formData.specialIssue === "Yes");
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("author", formData.author);
    data.append("doi", formData.doi); // Append DOI
    data.append("pdf", pdfFile);

    // Console log all key-value pairs in FormData
  console.log("FormData being submitted:");
  for (let [key, value] of data.entries()) {
    console.log(`${key}:`, value);
  }
    try {
      const response = await axios.post(
        "https://eeman.in:15002/publications",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Publication submitted successfully!");
    } catch (error) {
      console.error(
        "Error submitting publication:",
        error.response?.data || error.message
      );
      alert("Failed to submit publication.");
    }
  };

  const handleView = () => {
    navigate("/publications");
  };

  return (
    <>
      <Header />
      <div className="view-container">
        <button onClick={handleView}>View Publications</button>
      </div>
      <div className="upload-page-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Year:
                <input
                  type="number"
                  name="year"
                  placeholder="20xx"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Volume(Issue):
                <input
                  type="text"
                  name="volume"
                  placeholder="1(1)"
                  value={formData.volume}
                  onChange={handleChange}
                  required
                />
              </label>
              {volumeError && <p className="error">{volumeError}</p>}
            </div>

            <div className="form-row">
              <label>
                Special Issue:
                <select
                  name="isSpecialIssue"
                  value={formData.specialIssue}
                  onChange={handleChange}
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                Issue:
                <input
                  type="number"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  placeholder="Title of the Journal"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                DOI:
                <input
                  type="text"
                  name="doi"
                  placeholder="https://doi.org/xxxx"
                  value={formData.doi}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Content:
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    height: "120px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    resize: "vertical",
                    fontSize: "14px",
                    fontFamily: "inherit",
                  }}
                  placeholder="Enter the content of the publication"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Author:
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                PDF:
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="image-container">
          <h1>One click to update on IJEAE</h1>
          <img src={sideimage} alt="Side illustration" />
        </div>
      </div>
    </>
  );
};

export default Upload;
