import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../shared/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: donationRequests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['donationRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests?email=${user.email}`);
      return res.data.slice(0, 3); // Get recent 3
    },
    enabled: !!user?.email,
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, { donation_status: status });
      queryClient.invalidateQueries(['donationRequests', user?.email]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/donation-requests/${id}`);
          queryClient.invalidateQueries(['donationRequests', user?.email]);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-center text-red-500">Failed to load donation requests.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h1>

      {donationRequests.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Recent Donation Requests</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donationRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipient_name}</td>
                    <td>{req.recipient_district}, {req.recipient_upazila}</td>
                    <td>{req.donation_date}</td>
                    <td>{req.donation_time}</td>
                    <td>{req.blood_group}</td>
                    <td className="capitalize">{req.donation_status}</td>
                    <td>
                      {req.donation_status === 'inprogress' && (
                        <div>
                          <p>{user?.displayName}</p>
                          <p className="text-sm">{user?.email}</p>
                        </div>
                      )}
                    </td>
                    <td className="flex gap-1 flex-wrap">
                      {req.donation_status === 'inprogress' && (
                        <>
                          <button onClick={() => handleStatusUpdate(req._id, 'done')} className="btn btn-xs btn-success">Done</button>
                          <button onClick={() => handleStatusUpdate(req._id, 'canceled')} className="btn btn-xs btn-error">Cancel</button>
                        </>
                      )}
                      <button onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)} className="btn btn-xs btn-info">Edit</button>
                      <button onClick={() => handleDelete(req._id)} className="btn btn-xs btn-outline">Delete</button>
                      <button onClick={() => navigate(`/dashboard/donation-details/${req._id}`)} className="btn btn-xs">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button onClick={() => navigate('/dashboard/my-donation-requests')} className="btn btn-primary">
              View My All Requests
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
