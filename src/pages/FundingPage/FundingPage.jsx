import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../shared/Loading';

const FundingPage = () => {
    const axiosInstance = useAxios();
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchFunds();
    }, []);

    const fetchFunds = async () => {
        try {
            const res = await axiosInstance.get('/funds');
            setFunds(res.data);
        } catch (err) {
            console.error('Failed to load funds:', err);
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFunds = funds.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(funds.length / itemsPerPage);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Funding Records</h2>
                <button className="btn btn-primary" onClick={() => navigate('/dashboard/fund-payment')}>Give Fund</button>
            </div>

            {loading ? <Loading></Loading> : (
                <div className="overflow-x-auto min-h-screen">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFunds.map((fund, index) => (
                                <tr key={fund._id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{fund.user_name}</td>
                                    <td>{fund.user_email}</td>
                                    <td>${fund.amount}</td>
                                    <td>{new Date(fund.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <div className="join">
                    {[...Array(totalPages).keys()].map(num => (
                        <button
                            key={num}
                            className={`join-item btn btn-sm ${currentPage === num + 1 ? 'btn-active' : ''}`}
                            onClick={() => setCurrentPage(num + 1)}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FundingPage;
