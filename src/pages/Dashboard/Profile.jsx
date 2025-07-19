import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import districtData from '../../assets/districts.json';
import upazilaData from '../../assets/upazilas.json';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const { user: currentUser, updateUserProfile } = useContext(AuthContext);
  const currentUserEmail = currentUser?.email;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const axiosInstance = useAxios();

  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState(currentUser.photoURL);

  const districts = districtData[2].data.map(({ id, name }) => ({ id, name }));
  const upazilas = upazilaData[2].data.map(({ id, district_id, name }) => ({ id, district_id, name }));

  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile', currentUserEmail],
    enabled: !!currentUserEmail,
    queryFn: async () => {
      const res = await axiosInstance.get('/allUsers');
      const foundUser = res.data.find((u) => u.user_email === currentUserEmail);
      if (foundUser) {
        // Prefill form fields
        setValue('user_full_name', foundUser.user_full_name);
        setValue('user_email', foundUser.user_email);
        setValue('user_blood_group', foundUser.user_blood_group);
        setValue('user_district', foundUser.user_district);
        setValue('user_upazila', foundUser.user_upazila);
      }
      return foundUser;
    }
  });

  const selectedDistrict = districts.find((d) => d.name === watch('user_district'));
  const filteredUpazilas = upazilas.filter((u) => u.district_id === selectedDistrict?.id);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  const onSubmit = async (data) => {
    data.user_photo_url = profilePic;

    try {
      const res = await axiosInstance.put(`/allUsers/${user._id}`, data);
      if (res.data.modifiedCount > 0) {
        const userProfile = {
          displayName: data.user_full_name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            Swal.fire('Updated!', 'Your profile has been updated.', 'success');
            setEditMode(false);
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
            setEditMode(false);
          });
      }
    } catch (error) {
      Swal.fire('Error', `Failed to update profile. ${error}`, 'error');
    }
  };

  if (isLoading || !user) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex justify-between items-start mb-4">
        <div></div>
        <img src={profilePic} alt="avatar" className="w-48 h-48 mt-2 rounded-full border-2 border-zinc-400 mb-8" />
        <button onClick={() => setEditMode(!editMode)} className="btn btn-sm btn-primary">
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="label">Full Name</label>
          <input type="text" className="input input-bordered w-full" {...register('user_full_name', { required: true })} disabled={!editMode} />
        </div>

        <div>
          <label className="label">Email (not editable)</label>
          <input type="email" className="input input-bordered w-full" {...register('user_email')} disabled />
        </div>

        <div>
          <label className="label">District</label>
          <select {...register('user_district', { required: true })} className="select select-bordered w-full" disabled={!editMode}>
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Upazila</label>
          <select {...register('user_upazila', { required: true })} className="select select-bordered w-full" disabled={!editMode}>
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="label">Blood Group</label>
          <select {...register('user_blood_group', { required: true })} className="select select-bordered w-full" disabled={!editMode}>
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="label"> {editMode && <>Profile Photo ( Max size 32MB )</>}</label>
          <input type="file" onChange={handleImageUpload} className={`input-bordered w-full file-input ${editMode ? "" : "hidden"}`} disabled={!editMode} />
        </div>

        {editMode && (
          <div className="col-span-2">
            <button type="submit" className="btn btn-success">Save Changes</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
