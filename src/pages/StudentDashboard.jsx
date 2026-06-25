import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  // Pull the current logged-in user's data to personalize the dashboard
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    // FIX: Clear BOTH auth states so ProtectedRoute doesn't get confused
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    
    navigate("/login");
  };

  return (
    <div className="card" style={{ padding: "20px", maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h1>Student Dashboard</h1>

      {user ? (
        <p>Welcome back, <strong>{user.email}</strong>!</p>
      ) : (
        <p>Welcome, Student!</p>
      )}
      
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
        <button onClick={() => navigate("/courses")} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Explore Courses
        </button>
        
        <button 
          onClick={handleLogout} 
          style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;