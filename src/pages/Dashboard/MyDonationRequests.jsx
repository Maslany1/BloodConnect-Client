import React, { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['donationRequests', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests?email=${user.email}`);
      return res.data;
    },
  });

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
          refetch();
        } catch (error) {
          console.error('Delete error:', error);
        }
      }
    });
  };

  const handleStatusUpdate = async (id, donation_status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, { donation_status });
      refetch();
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const filteredRequests =
    filter === 'all' ? requests : requests.filter((req) => req.donation_status === filter);

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
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
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : currentRequests.length > 0 ? (
              currentRequests.map((req) => (
                <tr key={req._id}>
                  <td>{req.recipient_name}</td>
                  <td>
                    {req.recipient_district}, {req.recipient_upazila}
                  </td>
                  <td>{req.donation_date}</td>
                  <td>{req.donation_time}</td>
                  <td>{req.blood_group}</td>
                  <td className="capitalize">{req.donation_status}</td>
                  <td>
                    {req.donation_status === 'inprogress' && (
                      <div>
                        <p>{req.requester_name}</p>
                        <p className="text-sm">{req.requester_email}</p>
                      </div>
                    )}
                  </td>
                  <td className="flex gap-1 flex-wrap">
                    {req.donation_status === 'inprogress' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, 'done')}
                          className="btn btn-xs btn-success"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(req._id, 'canceled')}
                          className="btn btn-xs btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)}
                      className="btn btn-xs btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-xs btn-outline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/donation-details/${req._id}`)}
                      className="btn btn-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequests;
