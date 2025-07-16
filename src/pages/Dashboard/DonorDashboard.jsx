import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [donationRequests, setDonationRequests] = useState([]);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorRequests = async () => {
      try {
        const res = await axiosInstance.get(`/donation-requests?email=${user.email}`);
        const recent = res.data.slice(0, 3);
        setDonationRequests(recent);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
      }
    };

    if (user?.email) {
      fetchDonorRequests();
    }
  }, [user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosInstance.patch(`/donation-requests/${id}`, { donation_status: status });
      setDonationRequests((prev) =>
        prev.map((item) => (item._id === id ? { ...item, donation_status: status } : item))
      );
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/donation-requests/${id}`);
          setDonationRequests((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
          console.error('Deletion failed:', error);
        }
      }
    });
  };

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
                          <p>{user.displayName}</p>
                          <p className="text-sm">{user.email}</p>
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
