import React from "react"; 
import Navbar from "../../components/Navbar";
import "./Orders.css";
import burrImage from "../../assets/bur.png";
import { Button } from "primereact/button";
import NavbarProvider from "../../components/NavbarProvider";


const OrdersList = () => {
  return (
    <div>
      <NavbarProvider />
      <div className="orders-section">
        <h2>Orders List</h2>
        
        <div className="order-card">
          <img src={burrImage} alt="Order 1" className="order-image" />
          <p>Jun 10, 2014 | 9:41 AM</p>
          <p>50$ - 150$</p>
          <p>Total: 50$</p>
		  <Button label="View" severity="success" rounded />
        </div>

        <div className="order-card">
          <img src={burrImage} alt="Order 2" className="order-image" />
          <p>Jun 10, 2014 | 9:41 AM</p>
          <p>50$ - 150$</p>
          <p>Total: 50$</p>
		  <Button label="View" severity="success" rounded />
        </div>

        <div className="order-card">
          <img src={burrImage} alt="Order 3" className="order-image" />
          <p>Jun 10, 2014 | 9:41 AM</p>
          <p>50$ - 150$</p>
          <p>Total: 50$</p>
		  <Button label="View" severity="success" rounded />
        </div>

        <div className="order-card">
          <img src={burrImage} alt="Order 4" className="order-image" />
          <p>Jun 10, 2014 | 9:41 AM</p>
          <p>50$ - 150$</p>
          <p>Total: 50$</p>
		  <Button label="View" severity="success" rounded />
        </div>

      </div>
    </div>
  );
};
export default OrdersList;
