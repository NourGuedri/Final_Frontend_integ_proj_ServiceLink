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
  const serviceId = queryParams.get('service_id'); // Assuming service_id is also passed in the query parameters

  const hasServiceId = queryParams.has('service_id'); // Check if service_id is present
  

  return (
    <div>
      <Navbar />
      <div className="home-request">
      <h1>{serviceName ? serviceName : "Service"}</h1>
          {/* Conteneur pour les boutons et "Or" */}
        <div className="buttons-or">
        {hasServiceId ? (
            <Link to={`/request-service?service=${encodeURIComponent(serviceName)}&service_id=${serviceId}`}>
              <Button label="Request" severity="secondary" raised />
            </Link>
          ) : (
            <p>Service ID is missing</p>
          )}
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
