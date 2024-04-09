import axios from 'axios';

export const initialization = (config) => {
    const axiosInstance = axios.create(config);
    return axiosInstance;
};

