import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { logout } from "../services/AuthService";
import { ToggleButton } from 'primereact/togglebutton';

function Navbar({ state }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>ServiceLink</h1> 
          {isLoggedIn && (
          <ToggleButton onLabel="Provider" offLabel="Client" onIcon="pi pi-check" offIcon="pi pi-times" checked={checked2} onChange={(e) => setChecked2(e.value)} />
        )}      
      </div>
      <div className="navbar-right">
        {isLoggedIn && (
          <Link to="/home-client" className="nav-link">
            Home
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/client-profile" className="nav-link">
            Profile
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