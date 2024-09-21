import Axios, { InternalAxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { AuthResponse, User } from '../types/api';
import { env } from '@/config/env';
import { storage } from '../utils/storage';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;

  const jwt = storage.getToken();
  if (jwt) config.headers.Authorization = `Bearer ${jwt}`;

  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  }
);

export async function getUserProfile(): Promise<User> {
  const response = await api.get('/auth/me');
  return response.data;
}

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginCredentials = z.infer<typeof loginInputSchema>;

export const loginWithEmailAndPassword = (
  data: LoginCredentials
): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        })
      )
  );

export type RegisterCredentials = z.infer<typeof registerInputSchema>;

export const registerWithEmailAndPassword = (
  data: RegisterCredentials
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

export const logout = (): Promise<void> => {
  storage.clearToken();
  return api.post('/auth/logout');
};
