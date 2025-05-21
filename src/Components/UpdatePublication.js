import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./UpdatePublication.css";

const UpdatePublication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [publication, setPublication] = useState({
    year: "",
    volume: "",
    issue: "",
    title: "",
    content: "",
    author: "",
    specialIssue: "No",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [existingPdf, setExistingPdf] = useState(null); // For existing file
  const [volumeError, setVolumeError] = useState("");

  useEffect(() => {
    axios
      .get(`https://eeman.in:15002/publications/${id}`)
      .then((res) => {
        const data = res.data?.data || res.data; // Adjust according to your backend format

        console.log("Fetched update data:", res.data);
        setPublication({
          year: data.year || "",
          volume: data.volume || "",
          issue: data.issue || "",
          title: data.title || "",
          content: data.content || "",
          author: data.author || "",
          specialIssue: data.specialIssue || "No",
        });

        if (data.pdfUrl || data.pdf) {
          setExistingPdf(data.pdfUrl || data.pdf);
        }
      })

      .catch((err) => console.error("Error loading data:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "volume") {
      const volumeRegex = /^\d+\(\d+\)$/;
      if (!volumeRegex.test(value)) {
        setVolumeError("Please follow the format: X(Y) e.g., 1(1)");
      } else {
        setVolumeError("");
      }
    }

    setPublication({ ...publication, [name]: value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setExistingPdf(null); // If uploading new, remove old display
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (volumeError) {
      alert("Please fix the volume format.");
      return;
    }

    const formData = new FormData();

    for (const key in publication) {
      formData.append(key, publication[key]);
    }

    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }

    try {
      await axios.put(`https://eeman.in:15002/publications/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Publication updated successfully");
      navigate("/publications");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed.");
    }
  };

  return (
    <>
      <Header />
      <div className="update-container">
        <h2>Update Publication</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Year:
            <input
              type="number"
              name="year"
              placeholder="20xx"
              value={publication.year}
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
              value={publication.volume}
              onChange={handleChange}
              required
            />
          </label>
          {volumeError && <p className="update-error">{volumeError}</p>}

          <label>
            Issue:
            <input
              type="number"
              name="issue"
              value={publication.issue}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Special Issue:
            <select
              name="specialIssue"
              value={publication.specialIssue}
              onChange={handleChange}
              required
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>

          <label>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Title of the Journal"
              value={publication.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Content:
            <textarea
              name="content"
              value={publication.content}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Author:
            <input
              type="text"
              name="author"
              value={publication.author}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            PDF File:
            {existingPdf && (
              <div className="pdf-preview">
                <a href={existingPdf} target="_blank" rel="noopener noreferrer">
                  View Existing PDF
                </a>
                <button
                  type="button"
                  onClick={() => setExistingPdf(null)}
                  className="remove-pdf-button"
                >
                  Remove PDF
                </button>
              </div>
            )}
            {!existingPdf && (
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            )}
          </label>

          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePublication;
