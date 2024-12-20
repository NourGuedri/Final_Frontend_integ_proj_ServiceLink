import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css"; 
import notFoundImage from "../assets/page-not-found.png"; 

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img src={notFoundImage} alt="Page Not Found" className="not-found-image" />
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default PageNotFound;