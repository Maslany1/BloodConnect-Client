import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../provider/AuthProvider';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../shared/Loading';

const ContentManagementPage = () => {
  const { user } = useContext(AuthContext);
  const { role, loading: roleLoading } = useUserRole(user?.email);

  const axiosInstance = useAxios();
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Fetch blogs using TanStack Query
  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosInstance.get('/blogs');
      return res.data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/admin/blogs/${id}`, { status: newStatus });
      await refetch();
      Swal.fire(
        'Success',
        `Blog ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`,
        'success'
      );
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.delete(`/admin/blogs/${id}`);
        await refetch();
        Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (isLoading || roleLoading) {
    return <Loading />;
  }

  const filteredBlogs =
    filter === 'all' ? blogs : blogs.filter((blog) => blog.status === filter);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Content Management 📝</h2>
        <Link to="/dashboard/content-management-page/add-blogs" className="btn btn-primary">
          Add Blog
        </Link>
      </div>

      <div className="mb-4">
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img
                    src={blog.thumbnail}
                    alt="thumb"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{blog.title}</td>
                <td>
                  <span
                    className={`badge ${
                      blog.status === 'published' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <Link
                    to={`/dashboard/content-management-page/blogs/${blog._id}`}
                    className="btn btn-sm"
                  >
                    View
                  </Link>

                  <Link
                    to={`/dashboard/content-management-page/edit-blog/${blog._id}`}
                    className="btn btn-sm"
                  >
                    Edit
                  </Link>

                  {role === 'admin' && (
                    <>
                      {blog.status === 'draft' ? (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleStatusChange(blog._id, 'published')}
                        >
                          Publish
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleStatusChange(blog._id, 'draft')}
                        >
                          Unpublish
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="join">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`join-item btn btn-sm ${
                currentPage === num + 1 ? 'btn-active' : ''
              }`}
              onClick={() => setCurrentPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
