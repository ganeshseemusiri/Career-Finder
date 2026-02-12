import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./index.css";

function EditProfile() {
  const [form, setForm] = useState({ skills: "", experience: "", bio: "" });
  const [resume, setResume] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        skills: res.data.skills || "",
        experience: res.data.experience || "",
        bio: res.data.bio || "",
      });
    };
    load();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("skills", form.skills);
    data.append("experience", form.experience);
    data.append("bio", form.bio);
    if (resume) data.append("resume", resume);

    await api.put("/auth/me", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/profile");
  };

  return (
    <div className="edit-page">
      <form className="edit-card" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>

        <input
          placeholder="Skills"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />

        <input
          placeholder="Experience"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <input type="file" onChange={(e) => setResume(e.target.files[0])} />

        <button className="btn">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
