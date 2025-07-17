import React from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../shared/Loading';

const PublicBlogList = () => {
  const axiosInstance = useAxios();

  const { data: blogs = [], isLoading, isError, error } = useQuery({
    queryKey: ['publicBlogs'],
    queryFn: async () => {
      const res = await axiosInstance.get('/publicBlogs');
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    console.error("Error fetching blogs:", error);
    return (
      <p className="text-center text-red-500">
        Failed to load blogs. Please try again later.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="card bg-base-100 shadow p-4">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="rounded mb-3 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <Link to={`/blogs/${blog._id}`} className="btn btn-sm mt-2">
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicBlogList;
