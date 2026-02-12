import "./index.css";

function Filters({
  search,
  setSearch,
  location,
  setLocation,
  type,
  setType,
  experience,
  setExperience,
}) {
  return (
    <div className="filters-wrapper">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filters-bar">
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="All">All Locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Remote">Remote</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="All">All Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1-3 years</option>
          <option value="2+ years">2+ years</option>
          <option value="3+ years">3+ years</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
