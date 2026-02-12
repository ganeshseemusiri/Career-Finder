import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            Career<span>Finder</span>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>

            {token ? (
              <>
                <Link to="/saved">Saved</Link>
                <Link to="/applications">Applications</Link>
                <Link to="/profile" className="profile-btn">Profile</Link>

                <button
                  className="logout-btn"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="profile-btn">Login</Link>
                <Link to="/signup" className="profile-btn">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Logout?</h3>
            <p>Are you sure you want to logout?</p>

            <div className="modal-actions">
              <button
                className="modal-btn secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn danger"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
