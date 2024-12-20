import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./RequestService.css";
import burImage from "../../assets/bur.png";
import mecImage from "../../assets/mec.png"; // Image in the bottom right
import { Button } from "primereact/button";
import { Range, getTrackBackground } from "react-range";
import { createOrder } from "../../services/ServiceLinkClientService";

const RequestService = () => {
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState([0, 1000]);
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

    if (description.length < 20) {
      setMessage("Description is too short. It should have at least 20 characters.");
      setIsQueryMessage(false);
      return;
    }

    if (location.length < 10) {
      setMessage("Location name is too short. Please provide a detailed location.");
      setIsQueryMessage(false);
      return;
    }

    const queryParams = new URLSearchParams(locationState.search);
    const serviceId = queryParams.get('service_id'); // Extract service ID from query parameters

    if (!serviceId) {
      setMessage("Service ID is missing.");
      setIsQueryMessage(false);
      return;
    }

    const formData = new FormData();
    formData.append('service_id', serviceId); // Use the extracted service ID
    formData.append('title', serviceType);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('proposed_price_range_min', budget[0]);
    formData.append('proposed_price_range_max', budget[1]);
    for (let i = 0; i < files.length; i++) {
      formData.append('media', files[i]);
    }

    try {
      const response = await createOrder(formData);
      setMessage("Order created successfully!");
      setIsQueryMessage(true);
      navigate('/client-profile'); // Redirect to ClientProfile page
    } catch (error) {
      setMessage("Failed to create order.");
      setIsQueryMessage(false);
    }
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleTakePictures = (event) => {
    event.preventDefault(); // Prevent form submission
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
              <Range
                values={budget}
                step={1}
                min={0}
                max={1000}
                onChange={(values) => setBudget(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      background: getTrackBackground({
                        values: budget,
                        colors: ['#ccc', '#ff5733', '#ccc'],
                        min: 0,
                        max: 1000
                      }),
                      borderRadius: '4px'
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '10px',
                      width: '10px',
                      backgroundColor: '#FFF',
                      border: '1px solid #CCC',
                      borderRadius: '50%'
                    }}
                  />
                )}
              />
              <div className="budget-labels">
                <span>Min: {budget[0]} DT </span>
                <span className="max-budget-label">Max: {budget[1]} DT </span>
              </div>
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