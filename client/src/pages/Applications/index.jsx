import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./index.css";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApps(res.data);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  if (loading) return <p className="loading">Loading applications...</p>;

  return (
    <div className="applications-page">
      <h1>My Applications</h1>

      {apps.length === 0 && <p>No applications yet.</p>}

      <div className="applications-grid">
        {apps.map((a) => (
          <div className="app-card" key={a._id}>
            <div className="app-card-header">
              <h3>{a.job.title}</h3>
              <span className="badge">{a.job.type}</span>
            </div>

            <p className="company">{a.job.company}</p>

            <p className="meta">
              {a.job.location} &nbsp; {a.job.experience} &nbsp; {a.job.salary}
            </p>

            <div className="status-row">
              <span className="status-badge">{a.status || "Applied"}</span>
            </div>

            <div className="card-actions">
              <Link to={`/jobs/${a.job._id}`} className="btn primary">
                View Details
              </Link>

              <a
                href={`${BACKEND_URL}${a.resume}`}
                target="_blank"
                rel="noreferrer"
                className="btn secondary"
              >
                View Resume
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;
