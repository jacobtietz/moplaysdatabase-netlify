// src/pages/Settings.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Settings.css";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [biography, setBiography] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [street, setStreet] = useState("");
  const [stateCity, setStateCity] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState(false);

  const [visibility, setVisibility] = useState({
    phone: false,
    description: false,
    biography: false,
    companyName: false,
    street: false,
    stateCity: false,
    country: false,
    website: false,
    contact: false,
  });

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    document.title = "Settings – MPDB";
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/profile`, { withCredentials: true });
        if (!res.data.user) throw new Error("Not authenticated");
        const u = res.data.user;
        setUser(u);
        setFirstName(u.firstName || "");
        setLastName(u.lastName || "");
        setProfilePic(u.profile?.profilePicture || null);
        setPhone(u.phone || "");
        setDescription(u.profile?.description || "");
        setBiography(u.profile?.biography || "");
        setCompanyName(u.profile?.companyName || "");
        setStreet(u.profile?.street || "");
        setStateCity(u.profile?.stateCity || "");
        setCountry(u.profile?.country || "");
        setWebsite(u.profile?.website || "");
        setContact(u.contact || false);

        setVisibility(u.profile?.visibility || {
          phone: false,
          description: false,
          biography: false,
          companyName: false,
          street: false,
          stateCity: false,
          country: false,
          website: false,
          contact: false,
        });
      } catch (err) {
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate, API_URL]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        alert("Only PNG/JPG/JPEG files allowed.");
        return;
      }
      setProfilePic(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName.substring(0, 20));
      formData.append("lastName", lastName.substring(0, 20));
      formData.append("phone", phone);
      formData.append("description", description.substring(0, 450));
      formData.append("biography", biography.substring(0, 2000));
      formData.append("companyName", companyName);
      formData.append("street", street);
      formData.append("stateCity", stateCity);
      formData.append("country", country);
      formData.append("website", website);
      formData.append("contact", contact);
      formData.append("visibility", JSON.stringify(visibility));
      if (profilePic) formData.append("profilePicture", profilePic);

      const res = await axios.put(`${API_URL}/api/users/profile`, formData, {
        withCredentials: true,
      });
      alert("Profile updated!");
      setUser(res.data.user);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to save changes.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  const firstLetter = firstName.charAt(0);
  const restName = `${firstName.slice(1)} ${lastName}`;

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fields = [
    { label: "Phone", value: phone, setter: setPhone, key: "phone", type: "tel", placeholder: "+1 (555) 555-5555" },
    { label: "Contact Form", value: contact, setter: setContact, key: "contact", type: "checkbox" },
    { label: "Description", value: description, setter: setDescription, key: "description", type: "textarea" },
    { label: "Biography", value: biography, setter: setBiography, key: "biography", type: "textarea" },
    { label: "Company Name", value: companyName, setter: setCompanyName, key: "companyName", type: "text" },
    { label: "Street", value: street, setter: setStreet, key: "street", type: "text" },
    { label: "State & City", value: stateCity, setter: setStateCity, key: "stateCity", type: "text" },
    { label: "Country", value: country, setter: setCountry, key: "country", type: "text" },
    { label: "Website", value: website, setter: setWebsite, key: "website", type: "text", placeholder: "https://example.com" },
  ];

  return (
    <div className="settings-wrapper">
      <header className="settings-header">
        <h1>Settings</h1>
        <div className="user-section" ref={menuRef}>
          <div className="user-icon-circle" onClick={() => setUserMenuOpen(!userMenuOpen)}>
            {firstLetter}
          </div>
          <span onClick={() => setUserMenuOpen(!userMenuOpen)}>{restName}</span>

          {userMenuOpen && (
            <div className="user-dropdown">
              <button onClick={() => navigate(`/profile/${user._id}`)}>Profile</button>
              <button onClick={() => navigate("/settings")}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <main className="settings-main">
        <div className="profile-editor">
          <h2>Profile</h2>

          <div className="profile-pic-preview">
            <img
              src={profilePic instanceof File ? URL.createObjectURL(profilePic) : profilePic || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
              alt="Profile"
            />
            <input type="file" accept="image/png, image/jpeg" onChange={handleProfilePicChange} />
          </div>

          <div className="profile-fields">
            {/* Always visible: first/last name */}
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={20} />

            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={20} />

            {fields.map((field) => (
              <div className="field-line" key={field.key}>
                <label className="field-label">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea value={field.value} onChange={(e) => field.setter(e.target.value)} maxLength={field.key === "description" ? 450 : 2000} />
                ) : field.type === "checkbox" ? (
                  <input type="checkbox" checked={field.value} onChange={(e) => field.setter(e.target.checked)} />
                ) : (
                  <input type={field.type} value={field.value} onChange={(e) => field.setter(e.target.value)} placeholder={field.placeholder || ""} />
                )}
                <input
                  type="checkbox"
                  className="visibility-checkbox"
                  checked={visibility[field.key] || false}
                  onChange={() => toggleVisibility(field.key)}
                />
              </div>
            ))}

            <button className="save-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </main>
    </div>
  );
}
