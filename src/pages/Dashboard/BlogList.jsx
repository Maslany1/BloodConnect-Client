import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';

const BlogList = () => {
  const axiosInstance = useAxios();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="card bg-base-100 shadow p-4">
            <img src={blog.thumbnail} alt={blog.title} className="rounded mb-3 h-48 w-full object-cover" />
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <Link to={`/dashboard/blogs/${blog._id}`} className="btn btn-sm mt-2">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
