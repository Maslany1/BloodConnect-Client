import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import Loading from '../shared/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [formData, setFormData] = useState({
        title: '',
        thumbnail: '',
        content: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosSecure.get(`/blogs/${id}`);
                const blog = res.data;
                setFormData({
                    title: blog.title,
                    thumbnail: blog.thumbnail,
                    content: blog.content
                });
            } catch (error) {
                console.error('Failed to load blog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.put(`/admin/blogs/${id}`, formData);
            Swal.fire('Success', 'Blog updated successfully!', 'success');
            navigate('/dashboard/content-management-page');
        } catch (err) {
            console.error('Update failed:', err);
            Swal.fire('Error', 'Failed to update blog', 'error');
        }
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Edit Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    className="input input-bordered w-full"
                    placeholder="Blog Title"
                    defaultValue={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="thumbnail"
                    className="input input-bordered w-full"
                    placeholder="Thumbnail URL"
                    value={formData.thumbnail}
                    // defaultValue={formData.thumbnail}
                    onChange={handleChange}
                    required
                />
                <JoditEditor
                    value={formData.content}
                    onBlur={newContent => setFormData(prev => ({ ...prev, content: newContent }))}
                />
                <button type="submit" className="btn btn-primary">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlogPage;
