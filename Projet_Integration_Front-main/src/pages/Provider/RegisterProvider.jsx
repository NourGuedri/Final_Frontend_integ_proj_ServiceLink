import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Button } from "primereact/button";
import { createProviderRequest, fetchServices } from "../../services/ProviderService";
import "./RegisterProvider.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterProvider = () => {
  const [cin, setCin] = useState("");
  const [service, setService] = useState(""); 
  const [location, setLocation] = useState("");
  const [proofDocument, setProofDocument] = useState(null);
  const [servicesList, setServicesList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchAvailableServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const services = await fetchServices(token);
        setServicesList(services);
      } catch (err) {
        setError("An error occurred while fetching services.");
        console.error(err);
      }
    };

    fetchAvailableServices();
  }, []);

  const handleProofChange = (e) => {
    setProofDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("cin", cin);
    formData.append("service", service);
    formData.append("location", location);
    formData.append("proof_document", proofDocument);

    try {
      const token = localStorage.getItem("token");
      const response = await createProviderRequest(formData, token);
      if (response.success) {
        setMessage(response.message);
        // Navigate to orders list after successful submission
        navigate("/orders-list"); // Use navigate here
      } else {
        setError(response.error || "Submission failed");
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-provider-content">
        <div className="register-form-section">
          <h1 className="register-title">Become a Provider</h1>
          {message && <p className="message success">{message}</p>}
          {error && <p className="message error">{error}</p>}
          <form className="register-form" onSubmit={handleSubmit}>
            
            {/* Input for CIN */}
            <div className="form-group">
              <label htmlFor="cin">CIN</label>
              <input
                id="cin"
                type="text"
                placeholder="Enter your CIN"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                required
              />
            </div>

            {/* Dropdown for Service */}
            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
              >
                <option value="">Select a Service</option>
                {servicesList.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Input for Location */}
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* File upload for Proof Document */}
            <div className="form-group">
              <label htmlFor="proof">Proof Document</label>
              <input
                id="proof"
                type="file"
                onChange={handleProofChange}
                required
              />
            </div>

            {/* Submit button */}
            <div className="form-actions">
              <Button
                label={loading ? "Submitting..." : "Submit"}
                severity="warning"
                className="p-button-warning"
                type="submit"
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
