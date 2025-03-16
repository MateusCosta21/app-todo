import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface NavbarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onAddTaskClick: () => void;
  onLogout: () => void;
}

const Navbar = ({ isAuthenticated, onLoginClick, onRegisterClick, onAddTaskClick, onLogout }: NavbarProps) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Você tem certeza que deseja sair?");
    if (confirmLogout) {
      onLogout(); 
    }
  };

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
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-primary me-2" onClick={onAddTaskClick}>
                    Cadastrar Tarefa
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-danger" onClick={handleLogoutClick}>
                    <FaSignOutAlt /> Sair
                  </button>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
