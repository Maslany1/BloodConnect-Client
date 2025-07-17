import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../shared/Loading';

const HomeDonationRequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);

  const { data: request, isLoading, isError } = useQuery({
    queryKey: ['donation-request', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/donation-requests/${id}`);
      return res.data;
    },
    retry: false,
    onError: (error) => {
      if (error.response?.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Server error occurred. Please try again later.',
        });
        navigate('/blood-donation-request');
      }
    }
  });

  const donateMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.patch(`/donation-requests/${id}`, {
        donation_status: 'inprogress',
        requester_name: user.displayName,
        requester_email: user.email
      });
    },
    onSuccess: () => {
      Swal.fire('Success', 'You are now a donor for this request.', 'success');
      setModalOpen(false);
      queryClient.invalidateQueries(['donation-request', id]); // Refresh data
      navigate('/blood-donation-request');
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
    }
  });

  const handleDonateConfirm = () => {
    donateMutation.mutate();
  };

  if (isLoading) return <Loading></Loading> ;
  if (isError || !request) return <p className="text-center text-red-500">Request not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>
      <div className="bg-base-100 shadow-md p-4 rounded">
        <p><strong>Recipient Name:</strong> {request.recipient_name}</p>
        <p><strong>Location:</strong> {request.recipient_district}, {request.recipient_upazila}</p>
        <p><strong>Hospital:</strong> {request.hospital_name}</p>
        <p><strong>Full Address:</strong> {request.full_address}</p>
        <p><strong>Blood Group:</strong> {request.blood_group}</p>
        <p><strong>Date:</strong> {request.donation_date}</p>
        <p><strong>Time:</strong> {request.donation_time}</p>
        <p><strong>Request Message:</strong> {request.request_message}</p>
        <p><strong>Status:</strong> {request.donation_status}</p>
      </div>

      {request.donation_status === 'pending' && (
        <button className="btn btn-primary mt-6" onClick={() => setModalOpen(true)}>
          Donate Now
        </button>
      )}

      {/* Modal */}
      {modalOpen && (
        <dialog open className="modal modal-open">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Donation</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="modal-action">
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleDonateConfirm}>
                {donateMutation.isLoading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default HomeDonationRequestDetails;
