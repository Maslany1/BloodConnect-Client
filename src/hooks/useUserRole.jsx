import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useUserRole = (email) => {
  const axiosInstance = useAxios();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axiosInstance.get(`/allUsers/role?email=${email}`);
        setRole(res.data.role);
      } catch (error) {
        console.error('Error fetching role:', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchRole();
    }
  }, [email]);

  return { role, loading };
};

export default useUserRole;
