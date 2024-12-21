import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { logout } from "../services/AuthService";
import { ToggleButton } from 'primereact/togglebutton';

function Navbar({ state }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const [checked2, setChecked2] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register-provider" || location.pathname === "/orders-list" || location.pathname === "/view-order") {
      setChecked2(true);
    } else if (location.pathname === "/home-client") {
      setChecked2(false);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleToggleChange = (e) => {
    const newValue = e.value;
    setChecked2(newValue);
    if (newValue) {
      navigate("/register-provider");
    } else {
      navigate("/home-client");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>ServiceLink</h1> 
        {isLoggedIn && (
          <ToggleButton 
            onLabel="Switch to Client" 
            offLabel=" Switch to Provider" 
            onIcon="pi pi-check" 
            offIcon="pi pi-times" 
            checked={checked2} 
            onChange={handleToggleChange} 
          />
        )}      
      </div>
      <div className="navbar-right">
        {isLoggedIn && checked2 && (
          <>
            <Link to="/orders-list" className="nav-link">
              Orders
            </Link>
           
          </>
        )}
        {isLoggedIn && !checked2 && (
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