import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import districtData from '../../assets/districts.json';
import upazilaData from '../../assets/upazilas.json';
import Loading from '../shared/Loading';

const SearchPage = () => {
    const axiosInstance = useAxios();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [form, setForm] = useState({
        bloodGroup: '',
        district: '',
        upazila: '',
    });
    const [submittedForm, setSubmittedForm] = useState(null);

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    useEffect(() => {
        const uniqueDistrict = districtData[2].data.map(({ id, name }) => ({ id, name }));
        const uniqueUpazila = upazilaData[2].data.map(({ id, district_id, name }) => ({ id, district_id, name }));
        setDistricts(uniqueDistrict);
        setUpazilas(uniqueUpazila);
    }, []);

    const { data: donors = [], isFetching, refetch } = useQuery({
        queryKey: ['donors', submittedForm],
        queryFn: async () => {
            const res = await axiosInstance.get('/search', {
                params: {
                    blood_group: submittedForm.bloodGroup,
                    district: submittedForm.district,
                    upazila: submittedForm.upazila
                }
            });
            return res.data;
        },
        enabled: false // only run on manual trigger
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmittedForm({ ...form });
        refetch();
    };

    const selectedDistrict = districts.find(d => d.name === form.district);
    const filteredUpazilas = selectedDistrict
        ? upazilas.filter(upz => upz.district_id === selectedDistrict.id)
        : [];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Find Blood Donor 🧨</h2>

            <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-4 mb-8">
                <select
                    name="bloodGroup"
                    className="select select-bordered w-full"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>

                <select
                    name="district"
                    className="select select-bordered w-full"
                    value={form.district}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select District</option>
                    {districts.map(district => (
                        <option key={district.id} value={district.name}>{district.name}</option>
                    ))}
                </select>

                <select
                    name="upazila"
                    className="select select-bordered w-full"
                    value={form.upazila}
                    onChange={handleChange}
                    disabled={!form.district}
                    required
                >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map(upz => (
                        <option key={upz.id} value={upz.name}>{upz.name}</option>
                    ))}
                </select>

                <button type="submit" className="btn btn-primary col-span-full md:col-span-3">Search</button>
            </form>

            {isFetching && <Loading />}

            {!isFetching && donors.length > 0 && (
                <div className='min-h-screen'>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donors.map(donor => (
                            <div key={donor._id} className="card bg-base-100 shadow-md p-4">
                                <div className="flex items-center gap-4">
                                    <img src={donor.user_photo_url || "https://i.ibb.co/WRfzKKY/person-avater.png"} alt="avatar" className="w-16 h-16 rounded-full" />
                                    <div>
                                        <h3 className="font-bold">{donor.user_full_name}</h3>
                                        <p className="text-sm text-gray-600">{donor.user_email}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p><strong>Blood Group:</strong> {donor.user_blood_group}</p>
                                    <p><strong>District:</strong> {donor.user_district}</p>
                                    <p><strong>Upazila:</strong> {donor.user_upazila}</p>
                                    <p><strong>Status:</strong> {donor.user_status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!isFetching && donors.length === 0 && submittedForm && (
                <div className='min-h-screen'>
                    <p className="text-center text-gray-500 mt-6">No donors found. Try different criteria.<br />
                        eg. (Blood Group: A+, District: Comilla, Upazila: Comilla Sadar)</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
