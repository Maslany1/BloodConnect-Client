import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserStatus = (email) => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userStatus', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allUsers/status?email=${email}`);
      return res.data.status;
    },
    enabled: !!email, // only run query if email exists
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });

  return {
    status: data,
    loading: isLoading,
    error: isError ? error : null,
  };
};

export default useUserStatus;
