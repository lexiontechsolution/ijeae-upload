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

  const [volumeError, setVolumeError] = useState("");

  useEffect(() => {
    axios
      .get(`https://eeman.in:15002/publications/${id}`)
      .then((res) => {
        setPublication({
          ...res.data,
          specialIssue: res.data.specialIssue || "No",
          issue: res.data.issue || "",
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (volumeError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const payload = { ...publication };

    try {
      await axios.put(`https://eeman.in:15002/publications/${id}`, payload);
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

          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePublication;
