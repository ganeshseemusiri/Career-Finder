import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./index.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const handleReplaceResume = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.put("/auth/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to replace resume", err);
    }
  };

  const handleDeleteResume = async () => {
    try {
      const res = await api.put(
        "/auth/me",
        { resume: "" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete resume", err);
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;
  if (!user) return <p>Failed to load profile.</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>

        <div className="profile-section">
          <h3>Skills</h3>
          <p>{user.skills || "Not added"}</p>
        </div>

        <div className="profile-section">
          <h3>Experience</h3>
          <p>{user.experience || "Not added"}</p>
        </div>

        <div className="profile-section">
          <h3>Bio</h3>
          <p>{user.bio || "Not added"}</p>
        </div>

        <div className="profile-section">
          <h3>Resume</h3>

          {user.resume ? (
            <>
              <a
                href={`http://localhost:5000${user.resume}`}
                target="_blank"
                rel="noreferrer"
                className="view-resume-btn"
              >
                View Resume
              </a>

              <div className="resume-links">
                <label className="link-btn">
                  Replace
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleReplaceResume(e.target.files[0])}
                  />
                </label>
                <span className="divider">|</span>
                <button
                  className="link-btn danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <label className="view-resume-btn">
              Upload Resume
              <input
                type="file"
                hidden
                onChange={(e) => handleReplaceResume(e.target.files[0])}
              />
            </label>
          )}
        </div>

        <div className="bottom-actions">
          <Link to="/profile/edit" className="big-btn primary">
            Edit Profile
          </Link>
          <Link to="/applications" className="big-btn secondary">
            My Applications
          </Link>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Resume?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button
                className="big-btn secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="big-btn danger" onClick={handleDeleteResume}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
