import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import TodoList from "./pages/TodoList";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
        <Home />
        <Routes>
          <Route path="/todo" element={<TodoList />} />
        </Routes>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      </div>
    </Router>
  );
};

export default App;
