import React from 'react';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://bloodconnect-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;