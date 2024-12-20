import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";
import burImage from "../assets/bur.png";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { BackgroundLines } from "../components/ui/background-lines";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Redirect to login page with a message
    navigate(`/login?message=${encodeURIComponent('Please login to search for services')}`);
  };

  return (
    <div>
      <Navbar />
      <BackgroundLines svgOptions={{ duration: 3 }}>
        <div className="bur-section">
          <div className="bur-content">
            <h1 className="bur-title">SERVICELINK.TN</h1>
            <p className="bur-subtitle">Quicker, Cheaper, And BETTER</p>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Find Service"
                className="search-input"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <Button label="Search" severity="warning" onClick={handleSearch} />
              <Link to="/login">
                <Button label="Get Started" severity="warning" />
              </Link>
            </div>
          </div>
          <div className="bur-image">
            <img src={burImage} alt="bur" />
          </div>
        </div>
        <div className="stats-section">
          <Card
            title="3000"
            subTitle="Service requests"
            className="md:w-25rem"
          ></Card>

          <Card
            title="500"
            subTitle="Client Satisfaction"
            className="md:w-25rem"
          ></Card>

          <Card
            title="10009DT"
            subTitle="Payment"
            className="md:w-25rem"
          ></Card>
        </div>
      </BackgroundLines>
    </div>
  );
};

export default Home;