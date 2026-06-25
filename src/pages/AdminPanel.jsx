import { useNavigate }
from "react-router-dom";


function AdminPanel() {

  const navigate =
    useNavigate();

  function handleLogout() {

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  }

  return (
    <div className="card">
      <h1>Admin Panel</h1>

      <p>
        Welcome Admin
      </p>

      <button
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default AdminPanel;