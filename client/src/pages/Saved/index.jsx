import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";

function Saved() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  return (
    <div className="jobs-container">
      <h1>Saved Jobs</h1>

      {savedJobs.length > 0 ? (
        <div className="jobs-grid">
          {savedJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <p>No saved jobs yet.</p>
      )}
    </div>
  );
}

export default Saved;
