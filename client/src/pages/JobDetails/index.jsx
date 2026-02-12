import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!resumeUrl) {
      setMessage("Please paste your resume link");
      return;
    }

    try {
      await api.post(
        "/applications",
        {
          jobId: id,
          resumeUrl: resumeUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Applied successfully");
      setResumeUrl("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to apply ❌");
    }
  };

  if (loading) return <p className="loading">Loading job...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="job-page">
      <div className="job-wrapper">
        <Link to="/jobs" className="back-link">
          ← Back to Jobs
        </Link>

        <div className="job-card">
          <h1>{job.title}</h1>
          <h3>{job.company}</h3>

          <div className="job-meta">
            <span>{job.location}</span>
            <span>{job.type}</span>
            <span>{job.experience}</span>
            <span>{job.salary}</span>
          </div>

          <p className="job-desc">{job.description}</p>

          <form onSubmit={handleApply} className="apply-form">
            <label>Paste Resume Link (Google Drive, etc)</label>
            <input
              type="text"
              placeholder="https://drive.google.com/..."
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />

            <button type="submit" className="apply-btn">
              Apply Now
            </button>
          </form>

          {message && <p className="apply-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
