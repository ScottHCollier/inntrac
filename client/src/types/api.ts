// let's imagine this file is autogenerated from the backend
// ideally, we want to keep these api related types in sync
// with the backend instead of manually writing them out

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};

export type User = Entity<{
  firstName: string;
  surname: string;
  email: string;
  site: Site;
  schedules: Schedule[];
  role: 'ADMIN' | 'USER';
  group: Group;
  isAdmin: boolean;
  status: number;
  notifications: Notification[];
}>;

export type Site = Entity<{
  name: string;
}>;

export type Schedule = Entity<{
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
}>;

export type Notification = Entity<{
  firstName: string;
  surname: string;
  schedules: Schedule[];
}>;

export type Group = Entity<{
  name: string;
  color: string;
  siteId: string;
}>;

export type AuthResponse = {
  data: {
    id: string;
    jwt: string;
    user: User;
  };
};
