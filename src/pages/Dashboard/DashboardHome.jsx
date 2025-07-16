import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../shared/Loading';
import DonorDashboard from './DonorDashboard';
import { use } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import AdminDashboard from './AdminDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import Forbidden from '../shared/Forbidden';

const DashboardHome = () => {

    const { user } = use(AuthContext);

    const { role, loading: roleLoading } = useUserRole(user?.email);

    if (roleLoading) {
        return <Loading></Loading>;
    }

    if (role === 'donor') {
        return <DonorDashboard></DonorDashboard>
    }
    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else if (role === 'volunteer') {
        return <VolunteerDashboard></VolunteerDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }
};

export default DashboardHome;