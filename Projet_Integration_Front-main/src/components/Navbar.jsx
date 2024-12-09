import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { logout } from "../services/AuthService";

function Navbar({ state }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>ServiceLink</h1> 
      </div>
      <div className="navbar-right">
      {isLoggedIn && (
          <Link to="/home-client" className="nav-link">
            Home
          </Link>
        )}
        <div className="card flex justify-content-center">
          {!isLoggedIn && state !== "register" && (
            <Link to="/register-phone-number">
              <Button label="Register" text severity="warning" />
            </Link>
          )}
          {!isLoggedIn && state !== "login" && (
            <Link to="/login">
              <Button label="Login" severity="warning" />
            </Link>
          )}
          {isLoggedIn && (
            <Button label="Logout" severity="warning" onClick={handleLogout} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;