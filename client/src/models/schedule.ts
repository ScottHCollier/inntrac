export interface Schedule {
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

export interface AddSchedule {
  startTime: string;
  endTime: string;
  status: number;
  userId: string;
  groupId: string;
  siteId: string;
  type: number;
}
export interface AddScheduleTimeOff {
  dates: string[];
  status: number;
  userId: string;
  groupId: string;
  siteId: string;
  type: number;
}
