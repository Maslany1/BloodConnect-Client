import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';
import useAxios from '../../hooks/useAxios';


import districtData from '../../assets/districts.json';
import upazilaData from '../../assets/upazilas.json';


const Register = () => {

    const { createUser, setUser, updateUserProfile } = use(AuthContext);
    const axiosInstance = useAxios();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [firebaseError, setFirebaseError] = useState("");
    const [profilePic, setProfilePic] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');


    const navigate = useNavigate();

    const uniqueDistrict = districtData[2].data.map(({ id, name }) => ({ id, name }));
    // console.log(uniqueDistrict);

    const uniqueUpazilla = upazilaData[2].data.map(({ id, district_id, name }) => ({ id, district_id, name }));
    // console.log(uniqueUpazilla);

    // Load JSON data on mount
    useEffect(() => {
        setDistricts(uniqueDistrict);
        setUpazilas(uniqueUpazilla);
    }, []);

    // Watch selected district_id
    const selectedDistrictName = watch('district');

    const selectedDistrict = uniqueDistrict.find((w) => w.name===selectedDistrictName);
    const selectedDistrictId = selectedDistrict?.id;

    // Filter upazilas based on selected district_id
    const filteredUpazilas = upazilas.filter(
        (u) => u.district_id === selectedDistrictId
    );

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        // console.log(image)
        
        const formData = new FormData();
        formData.append('image', image);

        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);

    }

    const onSubmit = data => {

        // console.log(data);

        createUser(data.email, data.password)
            .then(async (result) => {

                const user = result.user;

                // update userinfo in the database
                const userInfo = {
                    user_full_name: data.name,
                    user_email: data.email.toLowerCase(),
                    user_photo_url: profilePic,
                    user_blood_group: data.bloodGroup,
                    user_district: data.district,
                    user_upazila: data.upazila,
                    user_role: 'donor', // default donor
                    user_status: 'active',  //default active
                    user_created_at: new Date().toISOString(),
                    user_last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/allUsers', userInfo);
                // console.log(userRes.data);

                // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        
                        Swal.fire({
                            icon: "success",
                            title: "Registered Successfully !",
                            showConfirmButton: true,
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/');
                                }
                            });
                    })
                    .catch(error => {
                        // console.log(error)

                        Swal.fire({
                            icon: "error",
                            title: error.message,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        setFirebaseError(error.message);
                        setUser(user);
                    })

            })
            .catch(error => {
                // console.error(error);
                Swal.fire({
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                const errorMessage = error.message;
                setFirebaseError(errorMessage);
            })
    }


    return (
        <div className='max-w-[1600px] mx-auto py-20 flex justify-center items-center'>
            <div className="card w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-4xl font-bold text-center">Register now!</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">

                        {/* name  */}
                        <label className="label" >Full Name</label>
                        <input
                            type="text"
                            {...register('name', {
                                required: 'Name is required !', minLength: {
                                    value: 5,
                                    message: 'Name should be more than 5 characters!',
                                },
                            })}
                            className="input" placeholder="Full Name" />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}

                        {/* email  */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required !', pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please provide a CORRECT email address !',
                                },
                            })}
                            className="input" placeholder="Email" />

                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                        <legend className="fieldset-legend">Upload Photo</legend>
                        <input type="file" onChange={handleImageUpload} className="file-input" required />
                        <label className="label">Max size 32MB</label>

                        {/* blood group  */}

                        <label className="block">
                            Blood Group
                            <select
                                {...register('bloodGroup', { required: 'Please select your blood group.' })}
                                className="select"
                            >
                                <option value=""> --- Please Select A Blood Group --- </option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </label>

                        {errors.bloodGroup && (
                            <p className="text-red-500 text-sm mt-1">{errors.bloodGroup.message}</p>
                        )}

                        {/* District Selector */}

                        <label className="block mb-1">District</label>
                        <select
                            {...register('district', { required: 'Please select a district !' })}
                            className="select select-bordered"
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                        {errors.district && (
                            <p className="text-red-500 text-sm">{errors.district.message}</p>
                        )}

                        {/* Upazila Selector */}

                        <label className="block mb-1">Upazila</label>
                        <select
                            {...register('upazila', { required: 'Please select an upazila' })}
                            className="select select-bordered"
                        >
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.map((upazila) => (
                                <option key={upazila.id} value={upazila.name}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                        {errors.upazila && (
                            <p className="text-red-500 text-sm">{errors.upazila.message}</p>
                        )}


                        {/* password  */}
                        <label>Password:</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                    message: 'Must include at least one uppercase and one lowercase letter',
                                },
                            })}
                            className="input"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}

                        {/* Confirm Password */}
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            {...register('confirm_password', {
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === password || 'Passwords do not match',
                            })}
                            className="input"
                        />
                        {errors.confirm_password && (
                            <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
                        )}

                        {
                            firebaseError && <p className='text-red-500'>{firebaseError}</p>
                        }

                        <button type='submit' className="btn bg-black text-white mt-4">Register</button>
                    </form>

                    <p className='font-medium'>Already have an account? Please {" "}
                        <Link to='/login' className='text-indigo-700 underline text-lg'>
                            Log in!
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;