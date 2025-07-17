import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Loading from '../shared/Loading';

const PublicBlogDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/publicBlogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error loading blog', err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <Loading></Loading>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.thumbnail} alt="blog thumbnail" className="mb-6 w-full rounded" />
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default PublicBlogDetails;
