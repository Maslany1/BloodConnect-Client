import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../shared/Loading';
import Swal from 'sweetalert2';

const PublicBlogDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    data: blog,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['publicBlogDetails', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/publicBlogs/${id}`);
      return res.data;
    },
    enabled: !!id,
    retry: false,
    onError: (error) => {
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Server error occurred. Please try again later.',
        });
        navigate('/blogs');
      }
    },
  });

  if (isLoading) return <Loading></Loading>;

  if (isError || !blog) {
    Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'Server error occurred. Please try again later.',
    });
    navigate('/blogs');
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.thumbnail}
        alt="blog thumbnail"
        className="mb-6 w-full rounded"
      />
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default PublicBlogDetails;
