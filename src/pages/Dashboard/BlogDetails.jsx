import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../shared/Loading';

const BlogDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!blog) return <p className="text-center text-gray-500">No blog found.</p>;

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

export default BlogDetails;
