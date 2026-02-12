import { useNavigate } from "react-router-dom";
import './index.css'

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    if (token) {
      navigate("/jobs");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="home-container">
      <h1>
        Find Your <span>Dream Job</span> Today
      </h1>
      <p>
        Search thousands of jobs, save your favorites, apply easily, and track
        your applications in one place.
      </p>

      <div className="home-actions">
        <button
          className="btn primary"
          onClick={() => navigate("/jobs")}
        >
          Browse Jobs
        </button>

        <button
          className="btn secondary"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
