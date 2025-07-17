import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';

const EditBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const [form, setForm] = useState({
        title: '',
        thumbnail: '',
        content: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosInstance.get(`/blogs/${id}`);
                const blog = res.data;
                setForm({
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
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/admin/blogs/${id}`, form);
            Swal.fire('Success', 'Blog updated successfully!', 'success');
            navigate('/dashboard/content-management-page');
        } catch (err) {
            console.error('Update failed:', err);
            Swal.fire('Error', 'Failed to update blog', 'error');
        }
    };

    if (loading) return <p>Loading blog...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Edit Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    className="input input-bordered w-full"
                    placeholder="Blog Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="thumbnail"
                    className="input input-bordered w-full"
                    placeholder="Thumbnail URL"
                    value={form.thumbnail}
                    onChange={handleChange}
                    required
                />
                <JoditEditor
                    value={form.content}
                    onBlur={newContent => setForm(prev => ({ ...prev, content: newContent }))}
                />
                <button type="submit" className="btn btn-primary">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlogPage;
