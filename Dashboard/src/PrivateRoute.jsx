import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

//  if the user is authenticated
const PrivateRoute = ({ children }) => {
  const username = Cookies.get("username"); 

  if (!username) {
   
    return <Navigate to="/" />;
  }

  return children; // If authenticated, render the children (protected page)
};

export default PrivateRoute;
