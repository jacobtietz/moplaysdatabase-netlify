// src/pages/EditPlay.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/EditPlay.css";

export default function EditPlay() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    publicationDate: "",
    acts: "",
    duration: "",
    total: "",
    males: "",
    females: "",
    funding: "Donated",
    coverImage: null,
    playFile: null, // <<< ADDED
    abstract: "",
    genre: "Comedy",
    organizationType: "University",
  });

  const [existingPlayFile, setExistingPlayFile] = useState(null); // <<< ADDED
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [currentUser, setCurrentUser] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ------------------- Auth Check -------------------
  useEffect(() => {
    document.title = "Edit – MPDB";
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/check`, {
          withCredentials: true,
        });

        const user = res.data.user;
        if (!user || (user.account !== 3 && user.account !== 4)) {
          setMessage({
            text: "You are not authorized to edit a play.",
            type: "error",
          });
          return;
        }
        setCurrentUser(user);
      } catch (err) {
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate, API_URL]);

  // ------------------- Fetch Play Data -------------------
  useEffect(() => {
    const fetchPlay = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/plays/${id}`, {
          withCredentials: true,
        });
        const play = res.data;

        setFormData({
          title: play.title || "",
          publicationDate: play.publicationDate?.slice(0, 10) || "",
          acts: play.acts || "",
          duration: play.duration || "",
          total: play.total || "",
          males: play.males || "",
          females: play.females || "",
          funding: play.funding || "Donated",
          coverImage: null,
          playFile: null, // user can replace
          abstract: play.abstract || "",
          genre: play.genre || "Comedy",
          organizationType: play.organizationType || "University",
        });

        setImagePreview(play.coverImage || null);
        setExistingPlayFile(play.playFile || null); // <<< ADDED
      } catch (err) {
        setMessage({ text: "Failed to load play.", type: "error" });
      }
    };

    fetchPlay();
  }, [id, API_URL]);

  // ------------------- Image Resize -------------------
  const resizeImage = (file, width, height) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              } else {
                reject("Resize failed");
              }
            },
            "image/jpeg",
            0.8
          );
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  };

  // ------------------- Form Handlers -------------------
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    // File inputs
    if (files && files[0]) {
      // Cover image
      if (name === "coverImage") {
        try {
          const resized = await resizeImage(files[0], 200, 250);
          setFormData({ ...formData, coverImage: resized });
          setImagePreview(URL.createObjectURL(resized));
        } catch {
          setMessage({ text: "Image resize failed.", type: "error" });
        }
      }

      // Play sample file (PDF/DOCX)
      else if (name === "playFile") {
        const file = files[0];
        const allowed = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowed.includes(file.type)) {
          setMessage({ text: "Only PDF or DOCX files are allowed.", type: "error" });
          return;
        }

        setFormData({ ...formData, playFile: file });
        setExistingPlayFile(null); // user is replacing file
      }

      return;
    }

    // Normal inputs
    setFormData({ ...formData, [name]: value });
  };

  const handleNumericKey = (e, maxLength) => {
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
    if (e.target.value.length >= maxLength && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  // ------------------- Submit Form -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || (currentUser.account !== 3 && currentUser.account !== 4)) {
      setMessage({ text: "You are not authorized.", type: "error" });
      return;
    }

    try {
      const data = new FormData();

      // Append all values
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      // PUT request
      await axios.put(`${API_URL}/api/plays/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage({ text: "Play updated successfully!", type: "success" });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update play.";
      setMessage({ text: msg, type: "error" });
    }
  };

  return (
    <div className="create-play-wrapper">
      <h2>Edit Play</h2>
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

      {currentUser && (currentUser.account === 3 || currentUser.account === 4) ? (
        <form className="create-play-form" onSubmit={handleSubmit}>
          {/* Title */}
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />

          {/* Publication Date */}
          <label>Publication Date</label>
          <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} />

          {/* Acts */}
          <label>Acts</label>
          <input
            type="text"
            name="acts"
            value={formData.acts}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 2)}
          />

          {/* Duration */}
          <label>Duration (minutes)</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 3)}
            required
          />

          {/* Total Actors */}
          <label>Total Actors</label>
          <input
            type="text"
            name="total"
            value={formData.total}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 3)}
            required
          />

          {/* Males */}
          <label>Male Actors</label>
          <input
            type="text"
            name="males"
            value={formData.males}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 2)}
          />

          {/* Females */}
          <label>Female Actors</label>
          <input
            type="text"
            name="females"
            value={formData.females}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 2)}
          />

          {/* Funding */}
          <label>Funding</label>
          <select name="funding" value={formData.funding} onChange={handleChange}>
            <option value="Donated">Donated</option>
            <option value="Paid">Paid</option>
          </select>

          {/* Organization Type */}
          <label>Organization Type</label>
          <select
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            required
          >
            <option value="Elementary">Elementary</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
            <option value="University">University</option>
            <option value="Community">Community</option>
            <option value="Professional">Professional</option>
          </select>

          {/* Genre */}
          <label>Genre</label>
          <select name="genre" value={formData.genre} onChange={handleChange} required>
            <option value="Comedy">Comedy</option>
            <option value="Musical">Musical</option>
            <option value="Drama">Drama</option>
            <option value="Theatre of the Mind">Theatre of the Mind</option>
            <option value="Tragedy">Tragedy</option>
            <option value="Mystery">Mystery</option>
          </select>

          {/* Cover Image */}
          <label>Image File</label>
          <input type="file" name="coverImage" accept="image/*" onChange={handleChange} />

          {imagePreview && (
            <div
              className="image-preview"
              style={{
                width: "200px",
                height: "250px",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid #ccc",
                marginTop: "10px",
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "200px", height: "250px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Play Sample File */}
          <label>Play Sample File (PDF/DOCX)</label>
          <input type="file" name="playFile" accept=".pdf,.docx" onChange={handleChange} />

          {existingPlayFile && (
            <p style={{ marginTop: "5px" }}>
              Current File: <strong>{existingPlayFile.split("/").pop()}</strong>
            </p>
          )}

          {formData.playFile && (
            <p style={{ marginTop: "5px" }}>
              New File Selected: <strong>{formData.playFile.name}</strong>
            </p>
          )}

          {/* Abstract */}
          <label>Abstract</label>
          <textarea name="abstract" value={formData.abstract} onChange={handleChange} />

          <button type="submit">Update Play</button>
        </form>
      ) : (
        <p>You do not have permission to edit this play.</p>
      )}
    </div>
  );
}
