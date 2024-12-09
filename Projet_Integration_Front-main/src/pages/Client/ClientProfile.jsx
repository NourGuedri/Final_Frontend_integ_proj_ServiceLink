import React from 'react';
import './ClientProfile.css';
import Navbar from '../../components/Navbar';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <Navbar />
      <div className="profile-container">
        {/* Left Side: User Information */}
        <div className="user-info">
          <img
            src="https://via.placeholder.com/150"
            alt="User"
            className="user-photo"
          />
          <h2>Ahmed Hammami</h2>
          <p>Age: 30</p>
          <p>Phone: +123 456 789</p>
          <p>Location: City, Country</p>
          <p>Bio: Lorem ipsum dolor sit amet.</p>
        </div>

        {/* Right Side: Previous Orders */}
        <div className="orders-section">
          <h2>Previous Orders</h2>
          <div className="order-card">
            <p>Jun 10, 2014 | 9:41 AM</p>
            <p>50$ - 150$</p>
            <p>Total: 50$</p>
            <button className="order-status pending">Pending</button>
          </div>
          <div className="order-card">
            <p>Jun 10, 2014 | 9:41 AM</p>
            <p>50$ - 150$</p>
            <p>Total: 50$</p>
            <button className="order-status confirmed">Confirmed</button>
          </div>
          <div className="order-card">
            <p>Jun 10, 2014 | 9:41 AM</p>
            <p>50$ - 150$</p>
            <p>Total: 50$</p>
            <button className="order-status finished">Finished</button>
          </div>
          <div className="order-card">
            <p>Jun 10, 2014 | 9:41 AM</p>
            <p>50$ - 150$</p>
            <p>Total: 50$</p>
            <button className="order-status canceled">Canceled</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
