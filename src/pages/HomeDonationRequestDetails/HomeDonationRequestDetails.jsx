import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import useAxios from '../../hooks/useAxios';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const HomeDonationRequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosInstance.get(`/donation-requests/${id}`);
        setRequest(res.data);
      } catch (error) {
        // console.error('Error fetching request:', err);
        if (error.response && error.response.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Server error occurred. Please try again later.',
          });
          navigate('/blood-donation-request');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleDonateConfirm = async () => {
    try {
      await axiosInstance.patch(`/donation-requests/${id}`, {
        donation_status: 'inprogress',
        requester_name: user.displayName,
        requester_email: user.email
      });
      Swal.fire('Success', 'You are now a donor for this request.', 'success');
      setModalOpen(false);
      navigate('/blood-donation-request');
    } catch (err) {
      console.error('Error confirming donation:', err);
      Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!request) return <p className="text-center text-red-500">Request not found</p>;

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
              <button type="button" className="btn btn-primary" onClick={handleDonateConfirm}>Confirm</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default HomeDonationRequestDetails;
