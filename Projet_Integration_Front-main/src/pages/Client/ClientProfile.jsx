import React, { useState, useEffect } from 'react';
import './ClientProfile.css';
import Navbar from '../../components/Navbar';
import { getUserProfile } from '../../services/ProfileUser';
import { getClientOrders } from '../../services/ServiceLinkClientService';
import { Button } from "primereact/button";
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import {Link} from 'react-router-dom';

const ClientProfile = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();
        console.log('User profile data:', data);
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }

    async function fetchClientOrders() {
      try {
        const ordersData = await getClientOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch client orders:', error);
      }
    }

    fetchUserProfile();
    fetchClientOrders();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }
  const imageUrl = `http://localhost:8000${userData.img}`;
  return (
    <div className="user-profile">
      <Navbar />
      <div className="profile-container">
        {/* Left Side: User Information */}
        <div className="user-info">
          <img
            src={imageUrl}
            alt="User"
            className="user-photo"
          />
          <h2>{`${userData.prenom} ${userData.nom}`}</h2>
          <p>Age: {userData.age}</p>
          <p>Phone: {userData.phone}</p>
          <p>Location: {userData.location}</p>
          <p>Bio: {userData.bio}</p>
          <Link to="/edit-client-profile">
          <Button label="Edit Profile" raised outlined className="p-button-warning"  />
          </Link>        
          </div>

        {/* Right Side: Previous Orders */}
        <div className="orders-section">
          <h2>Previous Orders</h2>
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <p>{new Date(order.created_at).toLocaleString()}</p>
              <p>{order.proposed_price_range_min}$ - {order.proposed_price_range_max}$</p>
              <p>Final: {order.final_price}$</p>
              <button className={`order-status ${order.state ? order.state.toLowerCase() : ''}`}>
                {order.state || 'Unknown'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;