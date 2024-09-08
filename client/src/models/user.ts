import { IGroup } from './groups';
import { ISchedule } from './schedule';
import { ISite } from './site';

export interface ISetPassword {
  token: string;
  password: string;
}

export interface IAddUser {
  firstName: string;
  surname: string;
  email: string;
  site: ISite;
  group: IGroup;
  isAdmin: boolean;
  status: number;
}

export interface INotificationItem {
  firstName: string;
  surname: string;
  schedules: ISchedule[];
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISession {
  id: string;
  token: string;
}

export interface IUser {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  site: ISite;
  schedules: ISchedule[];
  group: IGroup;
  isAdmin: boolean;
  status: number;
  notifications: INotificationItem[];
}

export interface IRegisterAccount {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface IUserSchedule {
  id: string;
  firstName: string;
  surname: string;
  name: string;
  email: string;
  token: string;
  site: ISite;
  schedules: ISchedule[];
  group: IGroup;
  isAdmin: boolean;
  type: number;
}

export interface IUserParams {
  searchTerm: string | null;
  groupId: string | null;
  userId: string | null;
}

export interface IUserScheduleParams {
  weekStart: string;
  weekEnd: string;
  searchTerm?: string;
  groupId?: string;
  userId?: string;
}
