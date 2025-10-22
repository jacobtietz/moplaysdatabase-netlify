// src/pages/EditPlay.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/EditPlay.css";

export default function EditPlay() {
  const navigate = useNavigate();
  const { id } = useParams(); // play ID from URL
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
    abstract: "",
    genre: "Comedy",
  });
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
        console.error("Auth check failed:", err.response?.data?.message);
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
          abstract: play.abstract || "",
          genre: play.genre || "Comedy",
        });
        setImagePreview(play.coverImage || null);
      } catch (err) {
        console.error("Failed to fetch play:", err);
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
                reject(new Error("Canvas is empty"));
              }
            },
            "image/jpeg",
            0.8
          );
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // ------------------- Form Handlers -------------------
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      try {
        const resized = await resizeImage(files[0], 200, 250);
        setFormData({ ...formData, [name]: resized });
        setImagePreview(URL.createObjectURL(resized));
      } catch (error) {
        console.error("Image resize failed:", error);
        setMessage({ text: "Image resize failed.", type: "error" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    if (!currentUser) {
      setMessage({ text: "You must be logged in to edit a play.", type: "error" });
      return;
    }
    if (currentUser.account !== 3 && currentUser.account !== 4) {
      setMessage({ text: "You are not authorized to edit a play.", type: "error" });
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("publicationDate", formData.publicationDate);
      data.append("acts", formData.acts);
      data.append("duration", formData.duration);
      data.append("total", formData.total);
      data.append("males", formData.males);
      data.append("females", formData.females);
      data.append("funding", formData.funding);
      data.append("genre", formData.genre);
      data.append("abstract", formData.abstract);
      if (formData.coverImage) data.append("coverImage", formData.coverImage);

      await axios.put(`${API_URL}/api/plays/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage({ text: "Play updated successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to update play:", err.response || err);
      const errorMsg =
        err.response?.data?.message || "Failed to update play. Please try again.";
      setMessage({ text: errorMsg, type: "error" });
    }
  };

  return (
    <div className="create-play-wrapper">
      <h2>Edit Play</h2>
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

      {currentUser && (currentUser.account === 3 || currentUser.account === 4) ? (
        <form className="create-play-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Publication Date</label>
          <input
            type="date"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
          />

          <label>Acts</label>
          <input
            type="text"
            name="acts"
            value={formData.acts}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 2)}
          />

          <label>Duration (minutes)</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 3)}
            required
          />

          <label>Total Actors</label>
          <input
            type="text"
            name="total"
            value={formData.total}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 3)}
            required
          />

          <label>Male Actors</label>
          <input
            type="text"
            name="males"
            value={formData.males}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 2)}
          />

          <label>Female Actors</label>
          <input
            type="text"
            name="females"
            value={formData.females}
            onChange={handleChange}
            onKeyDown={(e) => handleNumericKey(e, 2)}
          />

          <label>Funding</label>
          <select name="funding" value={formData.funding} onChange={handleChange}>
            <option value="Donated">Donated</option>
            <option value="Paid">Paid</option>
          </select>

          <label>Genre</label>
          <select name="genre" value={formData.genre} onChange={handleChange} required>
            <option value="Comedy">Comedy</option>
            <option value="Musical">Musical</option>
            <option value="Drama">Drama</option>
          </select>

          <label>Image File</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
          {imagePreview && (
            <div
              className="image-preview"
              style={{
                width: "200px",
                height: "250px",
                overflow: "hidden",
                borderRadius: "6px",
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

          <label>Abstract</label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
          />

          <button type="submit">Update Play</button>
        </form>
      ) : (
        <p>You do not have permission to edit this play.</p>
      )}
    </div>
  );
}
