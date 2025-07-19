import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useQueries } from '@tanstack/react-query';
import { FaUsers, FaHandHoldingUsd, FaTint } from 'react-icons/fa';
import Loading from '../shared/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [usersQuery, fundsQuery, requestsQuery] = useQueries({
    queries: [
      {
        queryKey: ['allUsers'],
        queryFn: async () => {
          const res = await axiosSecure.get('/allUsers');
          return res.data;
        },
      },
      {
        queryKey: ['funds'],
        queryFn: async () => {
          const res = await axiosSecure.get('/funds');
          return res.data;
        },
      },
      {
        queryKey: ['adminDonationRequests'],
        queryFn: async () => {
          const res = await axiosSecure.get('/admin-donation-requests');
          return res.data;
        },
      },
    ],
  });

  const isLoading = usersQuery.isLoading || fundsQuery.isLoading || requestsQuery.isLoading;
  const isError = usersQuery.isError || fundsQuery.isError || requestsQuery.isError;

  const totalUsers = usersQuery.data?.filter((u) => u.user_role === 'donor')?.length || 0;
  const totalFunds = fundsQuery.data?.reduce((acc, curr) => acc + Number(curr.amount || 0), 0) || 0;
  const totalRequests = requestsQuery.data?.total || 0;

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-center text-red-500">Failed to load dashboard data.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}!</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donors */}
        <div className="card bg-white shadow-xl p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <FaUsers className="text-4xl text-blue-500" />
            <div>
              <p className="text-xl font-semibold">{totalUsers}</p>
              <p className="text-gray-600">Total Donors</p>
            </div>
          </div>
        </div>

        {/* Total Funding */}
        <div className="card bg-white shadow-xl p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <FaHandHoldingUsd className="text-4xl text-green-500" />
            <div>
              <p className="text-xl font-semibold">${totalFunds.toFixed(2)}</p>
              <p className="text-gray-600">Total Funding</p>
            </div>
          </div>
        </div>

        {/* Total Blood Donation Requests */}
        <div className="card bg-white shadow-xl p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <FaTint className="text-4xl text-red-500" />
            <div>
              <p className="text-xl font-semibold">{totalRequests}</p>
              <p className="text-gray-600">Blood Requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
