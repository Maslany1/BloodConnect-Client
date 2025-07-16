import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useUserRole from '../hooks/useUserRole';

const MultiRoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, loading: roleLoading } = useUserRole(user?.email);
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user || !allowedRoles.includes(role)) {
    // return <Navigate to="/forbidden" state={{ from: location }} replace />;
    return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
  }

  return children;
};

export default MultiRoleRoute;
