import React, { Children } from 'react';
import { Navigate } from 'react-router';
import { use } from 'react';
import { AuthContext } from './AuthProvider';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const { role, loading:roleLoading } = useUserRole(user?.email);

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;