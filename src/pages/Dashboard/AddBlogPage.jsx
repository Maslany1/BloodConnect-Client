import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddBlogPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const imageBBKey = import.meta.env.VITE_image_upload_key;

    const onSubmit = async (data) => {
        try {
            const blog = {
                title: data.title,
                thumbnail: imageURL,
                content,
                status: 'draft',
                created_at: new Date(),
            };

            const res = await axiosSecure.post('/addBlogs', blog);

            if (res.data.insertedId) {
                Swal.fire('Success', 'Blog created as draft!', 'success');
                reset();
                setContent('');
                setImageURL('');
                navigate('/dashboard/content-management-page');
            }
        } catch (err) {
            console.error('Blog creation failed:', err);
            Swal.fire('Error', 'Failed to create blog', 'error');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imageBBKey}`, {
                method: 'POST',
                body: formData
            });
            const imgData = await res.json();
            if (imgData.success) {
                setImageURL(imgData.data.url);
            }
        } catch (err) {
            console.error('Image upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="text"
                    {...register('title', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Blog Title"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered w-full"
                />

                {uploading && <p className="text-sm">Uploading image...</p>}
                {imageURL && <img src={imageURL} alt="Thumbnail" className="w-32 mt-2" />}

                <JoditEditor
                    value={content}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                />

                <button type="submit" className="btn btn-primary">Create Blog</button>
            </form>
        </div>
    );
};

export default AddBlogPage;
