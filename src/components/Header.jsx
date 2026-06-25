import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      <h1>Learning Management System</h1>

      <nav>

        <Link to="/">
          Home
        </Link>

        <Link to="/courses">
          Courses
        </Link>

        <Link to="/login">
          Login
        </Link>

      </nav>

    </header>
  );
}

export default Header;