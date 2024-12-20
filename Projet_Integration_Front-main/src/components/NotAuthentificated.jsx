import React from 'react';
import { Navigate } from 'react-router-dom';

const NotAuthentificated = ({ element: Component, ...rest }) => {
  const isnotAuthenticated = !localStorage.getItem('token'); // Check if the token exists

  return isnotAuthenticated ? <Navigate to="/home-client" /> : <Component {...rest} />;
};

export default NotAuthentificated;