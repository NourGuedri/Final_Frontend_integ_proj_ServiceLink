import React, { useState } from "react";
import { registerPhoneNumber } from "../services/AuthService";
import { Button } from "primereact/button";
import { Link, useNavigate  } from "react-router-dom";
import "./Register.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import burImage from "../assets/bur.png"; // Image in the bottom left
import mecImage from "../assets/mec.png"; // Image in the bottom right

import Navbar from "../components/Navbar";

const RegisterPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await registerPhoneNumber({ phone_number: phoneNumber });
      if (response.success) {
        
        setSuccessMessage(response.data.message);
         //navigate to verify code page
        navigate('/verify-code', { state: { phoneNumber } });
       
        
      }
      setErrorMessage(response.error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page">
      <Navbar state={"register"}  />


      <div className="register-container">
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="p-field">
              <span className="p-input-icon-left">
                <i className="pi pi-phone" />
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </span>
            </div>
            <Button
              label="Submit"
              className="p-button-warning button"
              raised
              outlined
            />
            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
            )}
            {successMessage && (
              <p style={{ color: "green", marginTop: "10px" }}>
                {successMessage}
              </p>
            )}
          </div>
        </form>
      </div>
      <img src={burImage} alt="bureau" className="image-left"  />
      <img src={mecImage} alt="mécanicien" className="image-right" />
    </div>
  );
};

export default RegisterPhoneNumber;
