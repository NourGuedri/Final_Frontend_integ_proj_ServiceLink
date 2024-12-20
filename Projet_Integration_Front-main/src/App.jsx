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
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import EditClientProfile from "./pages/Client/EditClientProfile";
import NotAuthentificated from "./components/NotAuthentificated";
import RegisterProvider from "./pages/Provider/RegisterProvider";
import OrdersList from "./pages/Provider/Orders";
import OrderDetails from "./pages/Provider/OrderDetails";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/login"  element={<PrivateRoute element={Login} />} />
          <Route path="/register-phone-number" element={<RegisterPhoneNumber />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/welcome" element={<PrivateRoute element={Home} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home-client" element={<HomeClient />} />
          <Route path="/req-or-brow" element={<ReqOrBrow />} />
          <Route path="/request-service" element={<RequestService/>} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/edit-client-profile" element={<NotAuthentificated element={EditClientProfile} />}  />
          <Route path="*" element={<PageNotFound />} /> {/* Catch-all route for undefined paths */}
          <Route path="/register-provider" element={<RegisterProvider />} />
          <Route path="/orders-list" element={<OrdersList />} />
          <Route path="/view-order" element={<OrderDetails />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
