import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import districtData from '../../assets/districts.json';
import upazilaData from '../../assets/upazilas.json';
import { use } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useUserStatus from '../../hooks/useUserStatus';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../shared/Loading';

const CreateDonationRequest = () => {

    const { user } = use(AuthContext);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const uniqueDistricts = districtData[2].data.map(({ id, name }) => ({ id, name }));
        const uniqueUpazilas = upazilaData[2].data.map(({ id, district_id, name }) => ({ id, district_id, name }));
        setDistricts(uniqueDistricts);
        setUpazilas(uniqueUpazilas);
    }, []);

    useEffect(() => {
        if (user) {
            setValue('requester_name', user?.displayName);
            setValue('requester_email', user?.email);
        }
    }, [user, setValue]);

    const selectedDistrict = districts.find(d => d.name === watch('recipient_district'));
    const filteredUpazilas = upazilas.filter(u => u.district_id === selectedDistrict?.id);

    const { status, loading } = useUserStatus(user?.email);
    if (loading) return <Loading></Loading>;

    const onSubmit = async (data) => {
        if (status !== 'active') {
            Swal.fire('Blocked', 'You are blocked from making donation requests.', 'error');
            return;
        }

        const request = {
            ...data,
            donation_status: 'pending',
            created_at: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post('/donation-requests', request);
            if (res.data.insertedId) {
                Swal.fire('Success', 'Donation request created successfully!', 'success');

                navigate('/dashboard/my-donation-requests');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-6">Create Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="label">Requester Name</label>
                    <input type="text" className="input input-bordered w-full" {...register('requester_name')} disabled />
                </div>

                <div>
                    <label className="label">Requester Email</label>
                    <input type="email" className="input input-bordered w-full" {...register('requester_email')} disabled />
                </div>

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
                    {errors.recipient_district && <p className="text-red-500 text-sm">District is required</p>}
                </div>

                <div>
                    <label className="label">Recipient Upazila</label>
                    <select {...register('recipient_upazila', { required: true })} className="select select-bordered w-full">
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                    {errors.recipient_upazila && <p className="text-red-500 text-sm">Upazila is required</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="label">Hospital Name</label>
                    <input type="text" className="input input-bordered w-full" {...register('hospital_name', { required: true })} />
                </div>

                <div className="md:col-span-2">
                    <label className="label">Full Address</label>
                    <input type="text" className="input input-bordered w-full" {...register('full_address', { required: true })} />
                </div>

                <div>
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
                    <button type="submit" className="btn btn-primary w-full">Request</button>
                </div>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
