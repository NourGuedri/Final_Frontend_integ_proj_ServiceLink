import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import RegisterPhoneNumber from "./pages/RegisterPhoneNumber";
import VerifyCode from "./pages/VerifyCode";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequestService from "./pages/Client/RequestService";
import "./App.css";
import Register from "./pages/Register";
import HomeClient from "./pages/Client/HomeClient";
import ReqOrBrow from "./pages/Client/ReqOrBrow";
import ClientProfile from "./pages/Client/ClientProfile";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-phone-number" element={<RegisterPhoneNumber />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/welcome" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home-client" element={<HomeClient />} />
          <Route path="/req-or-brow" element={<ReqOrBrow />} />
          <Route path="/request-service" element={<RequestService />} />
          <Route path="/client-profile" element={<ClientProfile />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
