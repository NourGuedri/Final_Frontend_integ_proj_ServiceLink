import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./RequestService.css";
import burImage from "../../assets/bur.png";
import mecImage from "../../assets/mec.png"; // Image in the bottom right
import { Button } from "primereact/button";

const RequestService = () => {
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState(50);
  const [message, setMessage] = useState("");
  const [isQueryMessage, setIsQueryMessage] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const locationState = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(locationState.search);
    const requestMessage = queryParams.get('message');
    if (requestMessage) {
      setMessage(requestMessage);
      setIsQueryMessage(true);
    }
  }, [locationState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!serviceType || !description || !location) {
      setMessage("Please fill in all fields.");
      setIsQueryMessage(false);
      return;
    }
    // Add your request service logic here
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleTakePictures = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div>
      <Navbar />
      <div className="request-service-content">
        <div className="request-form-section">
          <h1 className="request-title">Request a Service</h1>
          {message && (
            <p className={isQueryMessage ? "messageRequest" : "message"}>
              {message}
            </p>
          )}
          <form className="request-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Budget</label>
              <input
                type="range"
                min="0"
                max="100"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <span className="budget-label">DT {budget}</span>
            </div>
            <div className="form-actions">
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
              <Button
                label="Take Pictures/Videos"
                severity="secondary"
                className="p-button-secondary"
                onClick={handleTakePictures}
              />
              <Button
                label="Submit"
                severity="warning"
                className="p-button-warning"
                type="submit"
              />
            </div>
          </form>
        </div>
        <div className="images-section">
          <img src={burImage} alt="Plumber with laptop" className="image-left" />
          <img src={mecImage} alt="Plumber fixing pipes" className="image-right" />
        </div>
      </div>
    </div>
  );
};

export default RequestService;