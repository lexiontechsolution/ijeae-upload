import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Publications.css";
import axios from "axios";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPublications, setFilteredPublications] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("https://eeman.in:15002/publications");

        if (!response.ok) throw new Error("Failed to fetch publications.");

        const data = await response.json();
        setPublications(data);
        setFilteredPublications(data);
        console.log("Fetched Publications:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPublications();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = publications.filter((publication) =>
        publication.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPublications(filtered);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, publications]);

  const fetchPdf = (pdfId) => {
    // Construct the relative URL for the PDF
    const pdfUrl = `/view-pdf/${pdfId}`;

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      const response = await fetch(
        `https://eeman.in:15002/publications/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete the publication.");

      setPublications((prev) => prev.filter((pub) => pub._id !== id));
      setFilteredPublications((prev) => prev.filter((pub) => pub._id !== id));

      alert("Publication deleted successfully!");
    } catch (error) {
      console.error("Error deleting publication:", error);
      alert("Failed to delete the publication.");
    }
  };

  return (
    <>
      <Header />
      <div className="publication-container">
        <h2>Publications of IJEAE</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        {filteredPublications.length > 0 ? (
          <table className="publication-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
                <th>Volume</th>
                {/* <th>Content</th> */}
                <th>PDF</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPublications.map((publication, index) => (
                <tr key={publication._id}>
                  <td>{index + 1}</td>
                  <td>{publication.title || "N/A"}</td>
                  <td>{publication.year || "N/A"}</td>
                  <td>{publication.volume || "N/A"}</td>
                  {/* <td>{publication.content || "N/A"}</td> */}
                  <td>
                    <button onClick={() => fetchPdf(publication._id)}>
                      View PDF
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() =>
                        window.confirm(
                          "Are you sure you want to delete this?"
                        ) && handleDelete(publication._id)
                      }
                    >
                      Delete
                    </button>
                    <button
                      className="update-button"
                      onClick={() =>
                        navigate(`/update-publication/${publication._id}`)
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No publications found or still loading...</p>
        )}
      </div>
    </>
  );
};

export default Publications;
