import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import TodoList from "./pages/TodoList";
import TaskModal from "./components/TaskModal";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Limpar os dados de autenticação do localStorage e sessionStorage
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setShowLogin(true)}
          onRegisterClick={() => setShowRegister(true)}
          onAddTaskClick={() => setShowTaskModal(true)}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} />}
      </div>
    </Router>
  );
};

export default App;
