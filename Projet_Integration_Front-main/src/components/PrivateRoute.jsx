import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists

  return isAuthenticated ? <Navigate to="/home-client" /> : <Component {...rest} />;};

export default PrivateRoute;