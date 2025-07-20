import React from 'react';
import axios from 'axios';
import { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const axiosSecure = axios.create({
    baseURL: `https://bloodconnect-server.vercel.app`
});

const useAxiosSecure = () => {


    const { user } = use(AuthContext);
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    
    return axiosSecure;
};

export default useAxiosSecure;