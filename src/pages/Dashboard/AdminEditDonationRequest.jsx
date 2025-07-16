import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import districtData from '../../assets/districts.json';
import upazilaData from '../../assets/upazilas.json';
import useAxios from '../../hooks/useAxios';

const AdminEditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    const uniqueDistricts = districtData[2].data.map(({ id, name }) => ({ id, name }));
    const uniqueUpazilas = upazilaData[2].data.map(({ id, district_id, name }) => ({ id, district_id, name }));
    setDistricts(uniqueDistricts);
    setUpazilas(uniqueUpazilas);
  }, []);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosInstance.get(`/donation-requests/${id}`);
        const data = res.data;
        for (let key in data) {
          setValue(key, data[key]);
        }
      } catch (error) {
        console.error('Failed to load donation request:', error);
        Swal.fire('Error', 'Could not fetch donation request.', 'error');
      }
    };

    fetchRequest();
  }, [id, axiosInstance, setValue]);

  const selectedDistrict = districts.find(d => d.name === watch('recipient_district'));
  const filteredUpazilas = upazilas.filter(u => u.district_id === selectedDistrict?.id);

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.put(`/donation-requests/${id}`, data);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated', 'Donation request updated successfully!', 'success');
        navigate('/dashboard/all-blood-donation-request');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update donation request.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Edit Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="label">Recipient Name</label>
          <input type="text" className="input input-bordered w-full" {...register('recipient_name', { required: true })} />
          {errors.recipient_name && <p className="text-red-500 text-sm">Recipient name is required</p>}
        </div>

        <div>
          <label className="label">Recipient District</label>
          <select {...register('recipient_district', { required: true })} className="select select-bordered w-full">
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Recipient Upazila</label>
          <select {...register('recipient_upazila', { required: true })} className="select select-bordered w-full">
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="label">Hospital Name</label>
          <input type="text" className="input input-bordered w-full" {...register('hospital_name', { required: true })} />
        </div>

        <div className="md:col-span-2">
          <label className="label">Full Address</label>
          <input type="text" className="input input-bordered w-full" {...register('full_address', { required: true })} />
        </div>

        <div className="md:col-span-2">
          <label className="label">Blood Group</label>
          <select {...register('blood_group', { required: true })} className="select select-bordered w-full">
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Donation Date</label>
          <input type="date" className="input input-bordered w-full" {...register('donation_date', { required: true })} />
        </div>

        <div>
          <label className="label">Donation Time</label>
          <input type="time" className="input input-bordered w-full" {...register('donation_time', { required: true })} />
        </div>

        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea className="textarea textarea-bordered w-full" rows="4" {...register('request_message', { required: true })}></textarea>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">Update Request</button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditDonationRequest;
