import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userRole', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allUsers/role?email=${email}`);
      return res.data.role;
    },
    enabled: !!email, // ensures the query only runs when email is available
    staleTime: 1000 * 60 * 5, // optional: 5 minutes caching
  });

  return {
    role: data,
    loading: isLoading,
    error: isError ? error : null,
  };
};

export default useUserRole;
