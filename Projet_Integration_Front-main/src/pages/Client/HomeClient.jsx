import Navbar from "../../components/Navbar";
import "./HomeClient.css";
import burrImage from "../../assets/bur1.png";
import { ListBox } from 'primereact/listbox';
import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../../services/ServiceLinkClientService";

const HomeClient = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getServices = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/login"); // Redirect to login if no token is found
        return;
      }

      const result = await fetchServices(token);
      if (result.success) {
        setServices(result.data);
      } else {
        console.error(result.error);
        if (result.error === "Unauthorized request") {
          navigate("/login"); // Redirect to login if the request is unauthorized
        }
      }
    };

    getServices();
  }, [navigate]);

  const handleServiceSelect = (e) => {
    setSelectedService(e.value);
  };

  const handleSearch = () => {
    if (selectedService) {
      navigate(`/req-or-brow?service=${encodeURIComponent(selectedService.name)}&service_id=${selectedService.id}`);   
     }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <Navbar  state={"home-client"}/>
      <div className="home-client">
        <h1>Welcome!</h1>
        <h1>How can I help you ?</h1>
        <div className="search-center">
          <ListBox
            filter
            optionLabel="name"
            className="search"
            value={selectedService}
            options={services}
            onChange={handleServiceSelect}
            onKeyPress={handleKeyPress}
          />
          <div>
            
          <Button severity="warning" label="Search" onClick={handleSearch} style={{ fontSize: '20px', padding: '20px 20px' }} />
          
          </div>

        </div>
        

        <div className="image-right">
          <img src={burrImage} alt="Right" />
        </div>
      </div>
    </div>
  );
};

export default HomeClient;