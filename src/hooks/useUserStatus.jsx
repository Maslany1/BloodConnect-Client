import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useUserStatus = (email) => {
  const axiosInstance = useAxios();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(`/allUsers/status?email=${email}`);
        setStatus(res.data.status);
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchStatus();
    }
  }, [email]);

  return { status, loading };
};

export default useUserStatus;