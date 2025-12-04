// src/pages/PlaySearch.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../App.css";
import "../css/PlaySearch.css";
import { FaSearch, FaFilter, FaEdit } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function PlaySearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const { page: pageParam } = useParams();

  const [plays, setPlays] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [fundingType, setFundingType] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [page, setPage] = useState(parseInt(pageParam) || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [expandedAbstract, setExpandedAbstract] = useState({});
  const [enterCooldown, setEnterCooldown] = useState(false); 
  const menuRef = useRef(null);

  const [advancedFilters, setAdvancedFilters] = useState({
    pubDateFrom: "",
    pubDateTo: "",
    subDateFrom: "",
    subDateTo: "",
    minDuration: "",
    maxDuration: "",
    males: "",
    females: "",
    acts: "",
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ------------------- Fetch Plays -------------------
  const fetchPlays = useCallback(async (newPage = 1) => {
    try {
      const response = await axios.get(`${API_URL}/api/plays`, {
        params: {
          search: search.trim() || undefined,
          genre: genre || undefined,
          fundingType: fundingType || undefined,
          organizationType: organizationType || undefined,
          pubDateFrom: advancedFilters.pubDateFrom || undefined,
          pubDateTo: advancedFilters.pubDateTo || undefined,
          subDateFrom: advancedFilters.subDateFrom || undefined,
          subDateTo: advancedFilters.subDateTo || undefined,
          minDuration: advancedFilters.minDuration || undefined,
          maxDuration: advancedFilters.maxDuration || undefined,
          males: advancedFilters.males || undefined,
          females: advancedFilters.females || undefined,
          acts: advancedFilters.acts || undefined,
          page: newPage,
          limit: 10,
        },
        withCredentials: true,
      });

      const data = response.data;
      setPlays(data.plays || []);
      setTotalResults(data.totalResults ?? data.total ?? 0);
      setTotalPages(data.totalPages ?? Math.ceil((data.totalResults ?? data.total ?? 0) / 10));
      setPage(newPage);

      navigate(`/plays/page/${newPage}`, { replace: true });
    } catch (error) {
      console.error("Error fetching plays:", error);
      setPlays([]);
      setTotalResults(0);
      setTotalPages(0);
      if (error.response?.status === 401) navigate("/login", { replace: true });
    }
  }, [search, genre, fundingType, organizationType, advancedFilters, navigate, API_URL]);

  // ------------------- Auth Check -------------------
  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users/profile`, { withCredentials: true });
      if (!res.data.user) throw new Error("Not authenticated");
      setUser(res.data.user);
    } catch (err) {
      navigate("/login", { replace: true });
    }
  }, [navigate, API_URL]);

  // ------------------- Populate search from URL -------------------
  useEffect(() => {
    document.title = "MPDB";

    checkAuth();

    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearch(searchQuery);

    fetchPlays(1);
  }, [location.search, fetchPlays, checkAuth]);

  // ------------------- Global Enter Key Listener -------------------
  useEffect(() => {
    const handleGlobalEnter = (e) => {
      if (e.key === "Enter" && !enterCooldown) {
        fetchPlays(1);
        setEnterCooldown(true);
        setTimeout(() => setEnterCooldown(false), 1000); 
      }
    };
    document.addEventListener("keydown", handleGlobalEnter);
    return () => document.removeEventListener("keydown", handleGlobalEnter);
  }, [enterCooldown, fetchPlays]);

  // ------------------- Click Outside Menu -------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilterMenu = () => setFilterOpen(!filterOpen);
  const firstLetter = user?.firstName?.charAt(0) || "";
  const restName = user ? `${user.firstName.slice(1)} ${user.lastName}` : "";

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleAbstract = (id) => setExpandedAbstract((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleAdvancedChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = () => {
    if (!enterCooldown) {
      fetchPlays(1);
      setEnterCooldown(true);
      setTimeout(() => setEnterCooldown(false), 1000); 
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && !enterCooldown) {
      fetchPlays(1);
      setEnterCooldown(true);
      setTimeout(() => setEnterCooldown(false), 1000);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) fetchPlays(newPage);
  };

  const shownResults = Math.min(page * 10, totalResults);

  return (
    <div className="play-search-wrapper">
      <header className="mpdb-header">
        <div className="search-user-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Title / Abstract / Author (First + Last)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyPress}
            />
            <button onClick={handleSearchClick}><FaSearch /></button>
          </div>

          {user && (
            <div className="user-section1" ref={menuRef}>
              <div className="user-icon-circle" onClick={() => setUserMenuOpen(!userMenuOpen)}>{firstLetter}</div>
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
        </div>
      </header>

      {/* --- Filters --- */}
      <div className="search-filters">
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Genre</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Musical">Musical</option>
          <option value="Theatre of the Mind">Theatre of the Mind</option>
          <option value="Tragedy">Tragedy</option>
          <option value="Mystery">Mystery</option>
        </select>
        <select value={fundingType} onChange={(e) => setFundingType(e.target.value)}>
          <option value="">Funding Type</option>
          <option value="Paid">Paid</option>
          <option value="Donated">Donated</option>
        </select>
        <select value={organizationType} onChange={(e) => setOrganizationType(e.target.value)}>
          <option value="">Organization Type</option>
            <option value="Elementary">Elementary</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
            <option value="University">University</option>
            <option value="Community">Community</option>
            <option value="Professional">Professional</option>
        </select>

        <div className="filter-wrapper">
          <button type="button" className="filter-btn" onClick={toggleFilterMenu}><FaFilter /> More Filters</button>
          {filterOpen && (
            <div className="filter-dropdown expanded">
              <h3>Advanced Filters</h3>
              <div className="filter-group">
                <label>Publication Date Range:</label>
                <input type="date" name="pubDateFrom" value={advancedFilters.pubDateFrom} onChange={handleAdvancedChange} />
                <input type="date" name="pubDateTo" value={advancedFilters.pubDateTo} onChange={handleAdvancedChange} />
              </div>
              <div className="filter-group">
                <label>Submission Date Range:</label>
                <input type="date" name="subDateFrom" value={advancedFilters.subDateFrom} onChange={handleAdvancedChange} />
                <input type="date" name="subDateTo" value={advancedFilters.subDateTo} onChange={handleAdvancedChange} />
              </div>
              <div className="filter-group">
                <label>Duration (Minutes):</label>
<input
  type="number"
  name="minDuration"
  value={advancedFilters.minDuration}
  onChange={handleAdvancedChange}
  placeholder="Min" // this text shows when empty
  style={{
    color: advancedFilters.minDuration ? "#000" : "#888", // dark text when typing, gray when empty
  }}
/>
                <input type="number" name="maxDuration" placeholder="Max" value={advancedFilters.maxDuration} onChange={handleAdvancedChange} />
              </div>
              <div className="filter-group">
                <label>Cast Requirement:</label>
                <input type="number" name="males" placeholder="Men" value={advancedFilters.males} onChange={handleAdvancedChange} />
                <input type="number" name="females" placeholder="Women" value={advancedFilters.females} onChange={handleAdvancedChange} />
              </div>
              <div className="filter-group">
                <label>Number of Acts:</label>
                <input type="number" name="acts" placeholder="e.g. 3" value={advancedFilters.acts} onChange={handleAdvancedChange} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Pagination Top --- */}
      {totalPages > 1 && (
        <div className="pagination bottom-pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
          {[...Array(totalPages).keys()].map((num) => (
            <button key={num} onClick={() => handlePageChange(num + 1)} className={page === num + 1 ? "active" : ""}>
              {num + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
        </div>
      )}
      <p className="results-count">
        Showing {shownResults} of {totalResults} results
      </p>

      {/* --- Play Results --- */}
      <div className="play-results">
        {plays.map((play, index) => {
          const canEdit = user && (user._id === play.authorId || user.account === 4);
          return (
            <React.Fragment key={play._id}>
              <div className="play-card">
                <img src={play.coverImage || "/placeholder.png"} alt={play.title} />
                <div className="play-info">
                  <div className="title-edit-row">
                    <h2>{play.title}</h2>
                    {canEdit && (
                      <button
                        className="edit-play-btn"
                        onClick={() => navigate(`/edit-play/${play._id}`)}
                        title="Edit Play"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>

                  <p className="play-author">
                    by{" "}
                    {play.authorId ? (
                      <span
                        className="author-link"
                        onClick={() => navigate(`/profile/${play.authorId}`)}
                        style={{ cursor: "pointer", textDecoration: "underline", color: "#007bff" }}
                      >
                        {play.author}
                      </span>
                    ) : (
                      play.author || "Anonymous"
                    )}
                  </p>

                  {/* Updated line to include organization type next to actors */}
                  <p className="play-details">
                    {play.genre || "-"} | {play.duration || 0} Minutes | {play.males || 0} M, {play.females || 0} W | {play.total || 0} Total Actors | {play.organizationType || "-"}
                  </p>

                  <p className="play-meta">
                    {play.funding || "-"} | {play.acts || "-"} Acts | Publication Date: {play.publicationDate ? new Date(play.publicationDate).toLocaleDateString() : "-"} | Submission Date: {play.submissionDate ? new Date(play.submissionDate).toLocaleDateString() : "-"}
                  </p>

                  <p className={`play-abstract ${expandedAbstract[play._id] ? "expanded" : ""}`}>
                    {play.abstract || "No abstract available"}
                  </p>
                  {play.abstract && play.abstract.length > 200 && (
                    <button className="read-more-btn" onClick={() => toggleAbstract(play._id)}>
                      {expandedAbstract[play._id] ? "Read Less" : "Read More"}
                    </button>
                  )}

                  <div className="play-actions">
                    <button className="request-sample-btn">Request Play Sample</button>
                  </div>
                </div>
              </div>
              {index < plays.length - 1 && <hr className="play-divider" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* --- Pagination Bottom --- */}
      {totalPages > 1 && (
        <div className="pagination bottom-pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
          {[...Array(totalPages).keys()].map((num) => (
            <button key={num} onClick={() => handlePageChange(num + 1)} className={page === num + 1 ? "active" : ""}>
              {num + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
        </div>
      )}

      {/* --- Floating Create Play Button for account 3 --- */}
      {user && user.account === 3 && (
        <div
          className="floating-create-play-btn"
          onClick={() => navigate("/plays/create")}
          title="Create Play"
        >
          <img src="/bookimage.png" alt="Create Play" />
        </div>
      )}
    </div>
  );
}
