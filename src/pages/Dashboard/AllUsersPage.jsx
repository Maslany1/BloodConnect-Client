import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { FaUserShield, FaUserCheck, FaUserSlash, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsersPage = () => {
    const axiosInstance = useAxios();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get('/allUsers');
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await axiosInstance.patch(`/allUsers/role/${id}`, { user_role: newRole });
            Swal.fire({
                icon: "success",
                title: "Role Updated !",
                showConfirmButton: false,
                timer: 1000,
            });
            fetchUsers();
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosInstance.patch(`/allUsers/status/${id}`, { user_status: newStatus });
            Swal.fire({
                icon: "success",
                title: "Status Updated !",
                showConfirmButton: false,
                timer: 1000,
            });
            fetchUsers();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This user will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(`/allUsers/${id}`);
                fetchUsers();
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blood Group</th>
                            <th>Location</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.user_full_name}</td>
                                <td>{user.user_email}</td>
                                <td>{user.user_blood_group}</td>
                                <td>{user.user_district}, {user.user_upazila}</td>
                                <td>
                                    <select
                                        className="select select-sm"
                                        value={user.user_role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="donor">Donor</option>
                                        <option value="volunteer">Volunteer</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="select select-sm"
                                        value={user.user_status}
                                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsersPage;
