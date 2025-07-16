import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router';
import { use } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const AllBloodDonationPage = () => {
    const {user} = use(AuthContext);
    const axiosInstance = useAxios();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const res = await axiosInstance.get('/admin-donation-requests');
            setDonations(res.data.requests);
        } catch (error) {
            console.error('Error fetching donations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosInstance.patch(`/donation-requests/${id}`, { donation_status: newStatus });
            fetchDonations();
            Swal.fire('Success', 'Status updated!', 'success');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this request?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(`/donation-requests/${id}`);
                fetchDonations();
                Swal.fire('Deleted!', 'Request deleted.', 'success');
            } catch (err) {
                console.error(err);
            }
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDonations = donations.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(donations.length / itemsPerPage);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">All Blood Donation Requests</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
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
                        {currentDonations.map((donation, index) => (
                            <tr key={donation._id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{donation.recipient_name}</td>
                                <td>{donation.recipient_district}, {donation.recipient_upazila}</td>
                                <td>{donation.donation_date}</td>
                                <td>{donation.donation_time}</td>
                                <td>{donation.blood_group}</td>
                                <td>
                                    <select
                                        className="select select-bordered select-sm"
                                        value={donation.donation_status}
                                        onChange={(e) => handleStatusChange(donation._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="done">Done</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </td>
                                <td>
                                    {donation.donation_status === 'inprogress' && (
                                        <div>
                                            <p>{donation.requester_name}</p>
                                            <p className="text-sm">{donation.requester_email}</p>
                                        </div>
                                    )}
                                </td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm" onClick={() => setSelectedRequest(donation)}>
                                        <FaEye />
                                    </button>
                                    <Link to={`/dashboard/admin-edit-donation/${donation._id}`} className="btn btn-sm">
                                        <FaEdit />
                                    </Link>
                                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(donation._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <div className="join">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page + 1}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`join-item btn btn-sm ${currentPage === page + 1 ? 'btn-active' : ''}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* DaisyUI Modal */}
            {selectedRequest && (
                <dialog id="donationModal" className="modal modal-open">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg mb-2">Donation Details</h3>
                        <p><strong>Recipient Name:</strong> {selectedRequest.recipient_name}</p>
                        <p><strong>Location:</strong> {selectedRequest.recipient_district}, {selectedRequest.recipient_upazila}</p>
                        <p><strong>Blood Group:</strong> {selectedRequest.blood_group}</p>
                        <p><strong>Hospital:</strong> {selectedRequest.hospital_name}</p>
                        <p><strong>Full Address:</strong> {selectedRequest.full_address}</p>
                        <p><strong>Donation Date & Time:</strong> {selectedRequest.donation_date} at {selectedRequest.donation_time}</p>
                        <p><strong>Status:</strong> {selectedRequest.donation_status}</p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setSelectedRequest(null)}>Close</button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default AllBloodDonationPage;
