import React from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Loading from '../shared/Loading';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const BloodDonationRequest = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { data: requests = [], isLoading, isError, error } = useQuery({
    queryKey: ['pending-donation-requests'],
    queryFn: async () => {
      const res = await axiosInstance.get('/public-donation-requests?status=pending');
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  const handleViewDetails = (id) => {
    navigate(`/home-donation-request-details/${id}`);
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) {
    Swal.fire({
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500
    });

    navigate('/');
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Pending Blood Donation Requests 🩸</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req._id} className="card bg-base-100 shadow-md p-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{req.recipient_name}</h3>
                <p><strong>Location:</strong> {req.recipient_district}, {req.recipient_upazila}</p>
                <p><strong>Blood Group:</strong> {req.blood_group}</p>
                <p><strong>Date:</strong> {req.donation_date}</p>
                <p><strong>Time:</strong> {req.donation_time}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleViewDetails(req._id)}
                  className="btn btn-primary btn-sm w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodDonationRequest;
