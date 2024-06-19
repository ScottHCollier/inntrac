import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from '../router/routes';
import {
  IAddSchedule,
  IAddScheduleTimeOff,
  IAddSite,
  IAddUser,
  IEditSchedule,
  ISetPassword,
  ILogin,
  PaginatedResponse,
  IRegisterAccount,
  ISession,
  IUser,
} from '@/models';
import { store } from '@/store/configure-store';
import { toast } from '@/components/ui/use-toast';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.session?.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];

          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }

          throw modelStateErrors.flat();
        }

        toast({
          title: 'Error',
          description: data.title,
        });
        break;
      case 401:
        toast({
          title: 'Error',
          description: data.title,
        });
        break;
      case 500:
        router.navigate('/server-error', { state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  getValidationError: () => requests.get('buggy/validation-error'),
  get500Error: () => requests.get('buggy/server-error'),
};

const Account = {
  login: (body: ILogin): Promise<ISession> =>
    requests.post('account/login', body),
  register: (body: IRegisterAccount): Promise<IUser> =>
    requests.post('account/register', body),
  addUser: (body: IAddUser) => requests.post('account', body),
  setPassword: (body: ISetPassword) =>
    requests.post('account/setPassword', body),
  currentUser: () => requests.get('account'),
  notifications: () => requests.get('account/notifications'),
};

const Schedules = {
  addSchedule: (body: IAddSchedule) => requests.post('schedules', body),
  requestTimeOff: (body: IAddScheduleTimeOff) =>
    requests.post('schedules/requestTimeOff', body),
  addBulkSchedules: (body: IAddSchedule[]) =>
    requests.post('schedules/addBulk', body),
  delete: (id: string) => requests.delete(`schedules/${id}`),
  updateSchedule: (body: IEditSchedule) => requests.put('schedules', body),
  updateSchedules: (body: IEditSchedule[]) =>
    requests.put('schedules/updateBulk', body),
  getSchedules: (params: URLSearchParams) => requests.get('schedules', params),
};

const Users = {
  getUsers: (params: URLSearchParams) => requests.get('users', params),
};

const Groups = {
  getGroups: () => requests.get('groups'),
};

const Sites = {
  addSite: (body: IAddSite) => requests.post('sites', body),
};

const agent = {
  TestErrors,
  Account,
  Schedules,
  Groups,
  Sites,
  Users,
};

export default agent;
