import { useEffect, useState } from "react";
import api from "../../services/api";
import JobCard from "../../components/JobCard";
import Filters from "../../components/Filters";
import "./index.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [experience, setExperience] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const text = search.toLowerCase();

    const matchSearch =
      job.title.toLowerCase().includes(text) ||
      job.company.toLowerCase().includes(text);

    const matchLocation = location === "All" || job.location === location;
    const matchType = type === "All" || job.type === type;
    const matchExperience =
      experience === "All" || job.experience === experience;

    return matchSearch && matchLocation && matchType && matchExperience;
  });

  if (loading) return <p className="loading">Loading jobs...</p>;

  return (
    <div className="jobs-container">
      <h1>Find Jobs</h1>
      <Filters
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        experience={experience}
        setExperience={setExperience}
      />
      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default Jobs;
