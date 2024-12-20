import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./OrderDetails.css";
import burrImage from "../../assets/bur.png";
import mecImage from "../../assets/mec.png";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const OrderDetails = () => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="order-details-page">
        {/* Profil Left Section */}
        <div className="profile-container">
          <div className="user-info">
            <img src={burrImage} alt="User" className="user-photo" />
            <h2>Ahmed Hammami</h2>
            <p>+123 456 789</p>
            <p>City, Country</p>
          </div>

          {/* Description and Save Button Section */}
          <div className="description-container">
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Write your description here..."
              className="description-input"
            />
            <label>Price :</label>
            <InputText type="text" placeholder="Enter your price..." />
            <br /><br />
              <Button label="Start conversation" severity="success" />
              <Button label="Reject order" severity="danger" />
          </div>
        </div>

        {/* Right Section: Order Info */}
        <div className="order-info-container">
          <h2>Order Title</h2>
          <p className="order-description">
            This is a detailed description of the order. You can write something
            about the items included, their specifications, or anything else.
          </p>
          <p>
            <strong>Location:</strong> City, Country
          </p>
          <p>
            <strong>Price:</strong> $150.00
          </p>
          <div className="order-images">
            <img src={mecImage} alt="Order Image 1" className="order-image" />
            <img src={mecImage} alt="Order Image 2" className="order-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
