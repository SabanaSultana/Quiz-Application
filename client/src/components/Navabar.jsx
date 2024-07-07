import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar-list">
      <li className="navbar-item">
        <Link to="/" className="navbar-link">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/signup" className="navbar-link">
          Signup
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/profile" className="navbar-link">
          Profile
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/quiz" className="navbar-link">
          Quiz
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
