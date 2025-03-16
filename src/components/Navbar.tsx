import { Link } from "react-router-dom";

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar = ({ onLoginClick, onRegisterClick }: NavbarProps) => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={onLoginClick}>
                Login
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={onRegisterClick}>
                Registrar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
