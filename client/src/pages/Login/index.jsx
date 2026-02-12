import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/jobs");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/jobs");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-inner">
        <h1>Login</h1>

        <form className="auth-card" onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="input-with-btn">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

          <p className="auth-switch">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
