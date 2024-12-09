import React from "react";
import Navbar from "../../components/Navbar";
import "./ReqOrBrow.css";
import burrImage from "../../assets/bur.png";
import { Button } from "primereact/button";
import { Link , useLocation } from "react-router-dom";

const ReqOrBrow = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceName = queryParams.get('service');

  return (
    <div>
      <Navbar />
      <div className="home-request">
      <h1>{serviceName ? serviceName : "Service"}</h1>
          {/* Conteneur pour les boutons et "Or" */}
        <div className="buttons-or">
        <Link to="/request-service">
          <Button label="Request" severity="secondary" raised />
        </Link>
          <h2>Or</h2>
          <Button label="Browse" severity="secondary" raised />
        </div>

        {/* Image en bas à droite */}
        <div className="image">
          <img src={burrImage} alt="Right" />
        </div>
      </div>
    </div>
  );
};

export default ReqOrBrow;
