import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Profile.css";
import axios from "axios";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Helper function to format phone numbers
const formatPhoneNumber = (number, defaultCountry = "US") => {
  if (!number) return "";
  try {
    const phoneNumber = parsePhoneNumberFromString(number, defaultCountry);
    if (!phoneNumber) return number;
    return phoneNumber.formatInternational();
  } catch (error) {
    console.error("Error formatting phone number:", error);
    return number;
  }
};

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    document.title = "Profile – MPDB";

    const fetchUser = async () => {
      try {
        const endpoint = id
          ? `${API_URL}/api/users/${id}`
          : `${API_URL}/api/users/profile`;

        const response = await axios.get(endpoint, { withCredentials: true });
        if (!response.data.user) {
          if (!id) navigate("/login", { replace: true });
          return;
        }

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (!id) navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate, API_URL]);

  // Close dropdown if click outside
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
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  const profile = user.profile || {};
  const firstLetter = user?.firstName?.charAt(0) || "";
  const restName = user ? `${user.firstName.slice(1)} ${user.lastName}` : "";

  return (
    <div className="profile-wrapper">
      {/* --- Header with User Menu --- */}
      <header className="profile-header-top">
        {user && (
          <div className="user-section2" ref={menuRef}>
            <div
              className="user-icon-circle"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
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
        )}
      </header>

      {/* --- Main Profile Content --- */}
      <section className="profile-header">
        <div className="profile-top">
          <img
            src={
              profile.profilePicture ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt={`${user.firstName} ${user.lastName}'s profile`}
            className="profile-photo"
          />
          <div className="profile-text">
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{profile.description || "This playwright has not added a description yet."}</p>
          </div>
        </div>

        <hr className="divider" />

        <div className="profile-links">
          <a
            className="profile-link"
            href={`/plays?search=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}`}
          >
            view plays »
          </a>
          <span className="link-divider">|</span>
          <a href="/plays/create" className="profile-link">submit your play »</a>
          <span className="link-divider">|</span>
          <a href="/contact" className="profile-link">contact »</a>
        </div>

        <hr className="divider" />
      </section>

      <section className="profile-bottom">
        <div className="general-info">
          <h3>General Information</h3>
          <p>{profile.companyName || "No company listed."}</p>
          <p>{profile.street && profile.stateCity ? `${profile.street}, ${profile.stateCity}` : "No address provided."}</p>
          <p>{profile.country || "No country specified."}</p>
          <p>{user.email}</p>
          <p>{formatPhoneNumber(user.phone)}</p>
          {profile.website ? (
            <p>
              <a
                href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.website}
              </a>
            </p>
          ) : <p>No website provided.</p>}
        </div>

        <div className="biography">
          <h3>Biography</h3>
          <p>{profile.biography || "This playwright hasn't written a biography yet."}</p>
        </div>
      </section>
    </div>
  );
}
