import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import burImage from "../assets/bur.png"; // Image in the bottom left
import mecImage from "../assets/mec.png"; // Image in the bottom right
import { registerUser } from "../services/AuthService";
import { Button } from "primereact/button";

import Navbar from "../components/Navbar";
const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validation côté client
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // Appeler l'API via le service
    const response = await registerUser(password, confirmPassword);

    if (response.error) {
      setErrorMessage(response.error); // Afficher l'erreur de l'API
    } else {
      setSuccessMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 2000); // Rediriger après 2 secondes
    }
  };

  return (
    <div className="register-page">
		<Navbar state={"register"}/>


      <div className="register-container">
        <h1>Set Your Password</h1>
        <form onSubmit={handleSubmit} className="password-form">
          <div className="input-group">
            <p style={{position:"relative",marginLeft: "-76%",fontWeight:"lighter"}}>Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <p  style={{position:"relative",marginLeft: "-64%",fontWeight:"lighter"}}>Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          </div>
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
          <Button
              label="Submit"
              className="p-button-warning button"
              raised
              outlined
            />
         
          {successMessage && (
            <p style={{ color: "green", marginTop: "10px" }}>
              {successMessage}
            </p>
          )
          }
        </form>
      </div>

      <div className="images-section">
      <img src={burImage} alt="bureau" className="image-left"  />
      <img src={mecImage} alt="mécanicien" className="image-right" />
      </div>
    </div>
  );
};

export default Register;
