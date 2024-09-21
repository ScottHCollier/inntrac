import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthResponse } from '../types/api';
import { storage } from '../utils/storage';
import {
  getUserProfile,
  LoginCredentials,
  loginWithEmailAndPassword,
  RegisterCredentials,
  registerWithEmailAndPassword,
  logout,
} from './api-client';

async function handleUserResponse(authResponse: AuthResponse) {
  const { jwt, user } = authResponse.data;
  storage.setToken(jwt);
  return user;
}

async function userFn() {
  return await getUserProfile();
}

async function loginFn(data: LoginCredentials) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentials) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await logout();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
