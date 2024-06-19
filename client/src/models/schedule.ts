export interface ISchedule {
  id: string;
  startTime: string;
  endTime: string;
  status: number;
  hours: number;
  userId: string;
  groupId: string;
  siteId: string;
  type: number;
}

export interface IAddSchedule {
  startTime: string;
  endTime: string;
  status: number;
  userId: string;
  groupId: string;
  siteId: string;
  type: number;
}
export interface IAddScheduleTimeOff {
  dates: string[];
  status: number;
  userId: string;
  groupId: string;
  siteId: string;
  type: number;
}

export interface IEditSchedule {
  type: number;
  id: string;
  startTime: string;
  endTime: string;
  status: number;
  userId: string;
  groupId: string;
  siteId: string;
}
