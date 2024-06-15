import { Group } from './groups';
import { Schedule } from './schedule';
import { Site } from './site';

export interface User {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  site: Site;
  schedules: Schedule[];
  group: Group;
  isAdmin: boolean;
  status: number;
}

export interface RegisterAccount {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface UserSchedule {
  id: string;
  firstName: string;
  surname: string;
  name: string;
  email: string;
  token: string;
  site: Site;
  schedules: Schedule[];
  group: Group;
  isAdmin: boolean;
  type: number;
}

export interface UserParams {
  searchTerm: string | null;
  groupId: string | null;
  userId: string | null;
}

export interface UserScheduleParams {
  weekStart: string;
  weekEnd: string;
  searchTerm?: string;
  groupId?: string;
  userId?: string;
}
