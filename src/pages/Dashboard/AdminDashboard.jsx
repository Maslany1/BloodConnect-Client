import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxios from '../../hooks/useAxios';
import { FaUsers, FaHandHoldingUsd, FaTint } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, fundsRes, requestsRes] = await Promise.all([
          axiosInstance.get('/allUsers'),
          axiosInstance.get('/funds'),
          axiosInstance.get('/admin-donation-requests'),
        ]);

        // Count only donors
        const donors = userRes.data.filter(u => u.user_role === 'donor');
        setTotalUsers(donors.length);

        // Sum funds
        const total = fundsRes.data.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
        setTotalFunds(total);

        setTotalRequests(requestsRes.data.total);
      } catch (error) {
        console.error('Failed to load admin stats:', error);
      }
    };

    fetchStats();
  }, [axiosInstance]);

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
