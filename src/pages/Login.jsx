import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Moved static mock data outside the component so it doesn't recreate on every render
const MOCK_USERS = [
  { email: "student@test.com", password: "1234", role: "student" },
  { email: "instructor@test.com", password: "1234", role: "instructor" },
  { email: "admin@test.com", password: "1234", role: "admin" }
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 1. Validate credentials
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid Credentials");
      return;
    }

    // 2. Set auth states in localStorage only after successful validation
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));

    // 3. Route user based on their specific role
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

  return (
    <div className="card">
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;