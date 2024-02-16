export interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  pending: boolean;
  hours: number;
  groupId: string;
  siteId: string;
}
