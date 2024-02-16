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
  sites: Site[];
  shifts: Shift[];
  groups: Group[];
  isAdmin: boolean;
  defaultSite: string;
  defaultGroup: string;
}

export interface UserShift {
  id: string;
  firstName: string;
  surname: string;
  name: string;
  email: string;
  token: string;
  sites: Site[];
  shifts: Shift[];
  groups: Group[];
  isAdmin: boolean;
  defaultSite: string;
  defaultGroup: string;
}

export interface UserParams {
  searchTerm: string | null;
  groupId: string | null;
  siteId: string | null;
  userId: string | null;
}

export interface UserShiftsParams {
  weekStart: string;
  weekEnd: string;
  searchTerm: string | null;
  groupId: string | null;
  siteId: string | null;
  userId: string | null;
}
