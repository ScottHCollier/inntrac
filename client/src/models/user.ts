import { Group } from './groups';
import { Shift } from './shift';
import { Site } from './site';

export interface User {
  id: string;
  firstName: string;
  surname: string;
  name: string;
  email: string;
  token: string;
  site: Site;
  shifts: Shift[];
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

export interface UserShift {
  id: string;
  firstName: string;
  surname: string;
  name: string;
  email: string;
  token: string;
  site: Site;
  shifts: Shift[];
  group: Group;
  isAdmin: boolean;
}

export interface UserParams {
  searchTerm: string | null;
  groupId: string | null;
  userId: string | null;
}

export interface UserShiftsParams {
  weekStart: string;
  weekEnd: string;
  searchTerm: string | null;
  groupId: string | null;
  userId: string | null;
}
