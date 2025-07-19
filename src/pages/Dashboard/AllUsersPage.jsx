import React, { useState } from 'react';
import { FaUserCheck, FaUserSlash, FaTrashAlt, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../shared/Loading';

const USERS_PER_PAGE = 5;

const AllUsersPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allUsers');
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 mins caching
  });

  const refetchUsers = () => queryClient.invalidateQueries(['users']);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/allUsers/role/${id}`, { user_role: newRole });
      Swal.fire({ icon: 'success', title: 'Role Updated!', showConfirmButton: false, timer: 1000 });
      refetchUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/allUsers/status/${id}`, { user_status: newStatus });
      Swal.fire({ icon: 'success', title: 'Status Updated!', showConfirmButton: false, timer: 1000 });
      refetchUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/allUsers/${id}`);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        refetchUsers();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

  const filteredUsers = statusFilter === 'all' ? users : users.filter(u => u.user_status === statusFilter);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  const renderStatusIcon = (status) =>
    status === 'active' ? <FaUserCheck className="text-green-500" /> : <FaUserSlash className="text-red-500" />;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">All Users</h2>
      <div className="mb-4">
        <label>Status Filter:</label>
        <select className="select select-bordered ml-2" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Current Status</th>
              <th className="text-center">Change Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * USERS_PER_PAGE + index + 1}</td>
                <td>
                  <img src={user.user_photo_url} alt="avatar" className="w-10 h-10 rounded-full" />
                </td>
                <td>{user.user_full_name}</td>
                <td>{user.user_email}</td>
                <td>
                  <select
                    className="select select-sm"
                    value={user.user_role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="donor">Donor</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <div className="flex justify-center items-center gap-2">
                    {renderStatusIcon(user.user_status)}
                    <span>{user.user_status}</span>
                  </div>
                </td>
                <td className="text-center">
                  {user.user_status === 'active' ? (
                    <button className="btn btn-xs btn-outline" onClick={() => handleStatusChange(user._id, 'blocked')}>
                      Block
                    </button>
                  ) : (
                    <button className="btn btn-xs btn-outline" onClick={() => handleStatusChange(user._id, 'active')}>
                      Unblock
                    </button>
                  )}
                </td>
                <td className="text-center">
                  <button className="btn btn-sm mr-2" onClick={() => setSelectedRequest(user)}>
                    <FaEye />
                  </button>

                  <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(user._id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {selectedRequest && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="card bg-base-100 shadow-sm">
              <figure className="px-10 pt-10">
                <img src={selectedRequest.user_photo_url} alt="User Avatar" className="rounded-xl w-32" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{selectedRequest.user_full_name}</h2>
              </div>
              <div className="p-4">
                <p>
                  <strong>User Name:</strong> {selectedRequest.user_full_name}
                </p>
                <p>
                  <strong>User Email:</strong> {selectedRequest.user_email}
                </p>
                <p>
                  <strong>Blood Group:</strong> {selectedRequest.user_blood_group}
                </p>
                <p>
                  <strong>Location:</strong> {selectedRequest.user_district}, {selectedRequest.user_upazila}
                </p>
                <p>
                  <strong>User Role:</strong> {selectedRequest.user_role}
                </p>
                <p>
                  <strong>User Status:</strong> {selectedRequest.user_status}
                </p>
              </div>
              <div className="modal-action">
                <button className="btn m-4" onClick={() => setSelectedRequest(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
