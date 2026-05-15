import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.global.token);
  console.log("token",token)
  return token ? children : <Navigate to="/login" />;
}
