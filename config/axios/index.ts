import { SERVER_BASE_URL } from '@/constants/api';
import { getAccessToken } from '@/helpers/api';
import axios, { AxiosError } from 'axios';
import { IDELETE, IGET, IPOST, IPUT } from './type';

type ApiRes<DataType = null> = {
  token(token: any): unknown;
  user(user: any): unknown;
  statusCode: number;
  message: string | null;
  data: DataType;
};

const api = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "true",

  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiRes>) => {
    const errorMsg = error.response?.data.message ?? 'An error occurred';
    console.log({ type: 'error', text1: errorMsg, position: 'bottom' })
    // Toast.show({ type: 'error', text1: errorMsg, position: 'bottom' });

    if (error.response?.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

function tokenInterceptor() {
  const interceptor = api.interceptors.request.use(
    async (config) => {
      const token = await getAccessToken();
      console.log('token:', token);
      if (token) {
        config.headers['x-auth-token'] = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return () => {
    api.interceptors.request.eject(interceptor);
  };
}

export const POST = async ({
  route,
  data,
  authorization=true,
  isFormData=false
}:IPOST) => {
  const eject = tokenInterceptor();
  const response = await api.post(
    route,
    data,
    {headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    }}
  );
  if (authorization) eject();
  return response.data;
}

export const GET = async ({
  route,
  authorization=true
}:IGET) => {
  const eject = tokenInterceptor();
  const response = await api.get(
    route,
    {headers: {"Content-Type": "application/json"}}
  );
  if (authorization) eject();
  return response.data;
}

export const PUT = async ({
  route,
  data,
  authorization=true,
  isFormData=false
}:IPUT) => {
  const eject = tokenInterceptor();
  const response = await api.put(
    route,
    data,
    {headers: {"Content-Type": isFormData ? "multipart/form-data" : "application/json"}}
  );
  if (authorization) eject();
  return response.data;
}

export const DELETE = async ({
  route,
  authorization=true
}:IDELETE) => {
  const eject = tokenInterceptor();
  const response = await api.delete(
    route
  );
  if (authorization) eject();
  return response.data;
}