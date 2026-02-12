import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Saved from "./pages/Saved";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";

function Layout() {
  const location = useLocation();

  const hideNavbar = ["/login", "/signup"].includes(location.pathname);
  const fullWidthPages = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      {fullWidthPages ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <Saved />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />

          </Routes>
        </div>
      )}
    </>
  );
}


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
