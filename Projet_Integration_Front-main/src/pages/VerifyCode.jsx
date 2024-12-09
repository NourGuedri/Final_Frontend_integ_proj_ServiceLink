import React, { useState } from "react";
import { verifyCode, resendVerificationCode } from "../services/AuthService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useNavigate,useLocation} from "react-router-dom";
import "./Register.css";
import burImage from "../assets/bur.png"; // Image in the bottom left
import mecImage from "../assets/mec.png"; // Image in the bottom right  

import Navbar from "../components/Navbar";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber; 
  const navigate = useNavigate();
  
  console.log(phoneNumber);
  // Appel de l'API pour vérifier le code
  const handleConfirm = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);
      const response = await verifyCode({ verification_code: code });
      if (response.success) {
       
        setSuccessMessage(response.data.message);
        navigate("/register");
        //navigate to verify code page
      }else{
        setErrorMessage(response.error);
      }
      setLoading(false);
      
     
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred.");
    }
  };

  // Appel de l'API pour renvoyer le code
  const handleResend = async (event) => {
    event.preventDefault();
   
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setIsResending(true);
      const response = await resendVerificationCode(phoneNumber);
      if (!response.success) {
        setSuccessMessage(response.data.message);}
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="register-page">
      		<Navbar state={"register"}/>

      <div className="register-container">
      <h1>Create Your Account</h1>
      <p style={{position:"relative",marginLeft: "-70%",fontWeight:"bold"}}>Enter Code</p>
      <div >
        <div className="p-field">
          <InputText
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            className="p-inputtext-sm"
          />
        </div>
        <div className="p-d-flex p-jc-between" style={{ marginTop: "10px" }}>
          <Button
            label="Resend"
            icon="pi pi-refresh"
            className="p-button-secondary resend-button"
            raised
            outlined
            onClick={handleResend}
            disabled={isResending}
          />
          <Button
            label="Confirm"
            icon="pi pi-check"
            className=" p-button-warning confirm-button "
            raised
              outlined
              disabled={loading}
            onClick={handleConfirm}
          />
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}
        {successMessage && (
          <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
        )}
        <p>A code has been sent to {phoneNumber}  </p>
      </div>
      </div>
      <img src={burImage} alt="bureau" className="image-left"  />
      <img src={mecImage} alt="mécanicien" className="image-right" />
    </div>
  );
};

export default VerifyCode;
