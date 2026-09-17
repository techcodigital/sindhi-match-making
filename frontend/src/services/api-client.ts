import axios from 'axios';

export const apiClient = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api', timeout: 8000 });

apiClient.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('smm_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const mockDelay = <T,>(data: T): Promise<T> => new Promise(resolve => setTimeout(() => resolve(data), 350));
