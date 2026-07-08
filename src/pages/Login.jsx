import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_USERS = [
  { email: "student@test.com", password: "1234", role: "student" },
  { email: "instructor@test.com", password: "1234", role: "instructor" },
  { email: "admin@test.com", password: "1234", role: "admin" }
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Local state to handle button hover effect natively inline
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const handleLogin = () => {
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid Credentials");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));

    switch (user.role) {
      case "student":
        navigate("/student-dashboard");
        break;
      case "instructor":
        navigate("/instructor-dashboard");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        alert("Unknown user role");
    }
  };

  // --- INLINE DESIGN SYSTEM OBJECTS ---
  
  // Centers the login card on the screen perfectly
  const pageWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    backgroundColor: "#1e293b", // --bg-slate-800
    border: "1px solid rgba(255, 255, 255, 0.08)", // --border-rgba
    borderRadius: "16px",
    padding: "40px 32px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)", // --shadow-xl
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxSizing: "border-box"
  };

  const titleStyle = {
    color: "#f8fafc", // --text-slate-50
    fontSize: "1.8rem",
    fontWeight: "700",
    textAlign: "center",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em"
  };

  const inputStyle = {
    backgroundColor: "#020617", // --bg-slate-950
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "8px",
    padding: "14px 16px",
    color: "#f1f5f9", // --text-slate-100
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease"
  };

  const buttonStyle = {
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "14px",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
    // Dynamic switch between --primary-indigo and --primary-hover
    backgroundColor: isBtnHovered ? "#4f46e5" : "#6366f1",
    transform: isBtnHovered ? "translateY(-1px)" : "none",
    transition: "all 0.2s ease"
  };

  const helperTextContainerStyle = {
    marginTop: "12px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    paddingTop: "16px",
    fontSize: "0.8rem",
    color: "#94a3b8", // --text-slate-400
    lineHeight: "1.5"
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome Back</h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button 
          onClick={handleLogin}
          style={buttonStyle}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
        >
          Sign In
        </button>

        {/* Dynamic Sandbox Credentials Helper Block */}
        <div style={helperTextContainerStyle}>
          <span style={{ fontWeight: 600, color: "#cbd5e1" }}>Demo Accounts:</span>
          <div style={{ marginTop: "4px" }}>Student: student@test.com / 1234</div>
          <div>Instructor: instructor@test.com / 1234</div>
        </div>
      </div>
    </div>
  );
}

export default Login;