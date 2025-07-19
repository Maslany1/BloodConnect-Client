import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../shared/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: funds = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['funds'],
    queryFn: async () => {
      const res = await axiosSecure.get('/funds');
      return res.data;
    },
    retry: 1,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    },
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFunds = funds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(funds.length / itemsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Funding Records</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/funds/payment')}
        >
          Give Fund
        </button>
      </div>

      {isLoading ? (
        <Loading></Loading>
      ) : isError ? (
        <p className="text-red-500 text-center">Something went wrong.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {currentFunds.map((fund, index) => (
                <tr key={fund._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{fund.name}</td>
                  <td>{fund.email}</td>
                  <td>${fund.amount}</td>
                  <td>{new Date(fund.paid_at).toLocaleDateString('en-AU')}</td>
                  <td>{new Date(fund.paid_at).toLocaleTimeString('en-AU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="join">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`join-item btn btn-sm ${currentPage === num + 1 ? 'btn-active' : ''
                }`}
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
