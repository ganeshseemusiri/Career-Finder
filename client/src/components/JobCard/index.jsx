import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

function JobCard({ job }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const exists = savedJobs.some((j) => j._id === job._id);
    setSaved(exists);
  }, [job._id]);

  const toggleSave = (e) => {
    e.preventDefault();
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (saved) {
      const updated = savedJobs.filter((j) => j._id !== job._id);
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setSaved(false);
    } else {
      const updated = [...savedJobs, job];
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setSaved(true);
    }
  };

  return (
    <Link to={`/jobs/${job._id}`} className="jobcard-link">
      <div className="jobcard">
        <div className="jobcard-header">
          <h3>{job.title}</h3>
          <span className="jobcard-type">{job.type}</span>
        </div>

        <p className="jobcard-company">{job.company}</p>

        <div className="jobcard-meta">
          <span>{job.location}</span>
          <span>{job.experience}</span>
          <span>{job.salary}</span>
        </div>

        <div className="jobcard-actions">
          <button className="jobcard-btn">View Details</button>
          <button
            className={`save-btn ${saved ? "saved" : ""}`}
            onClick={toggleSave}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
