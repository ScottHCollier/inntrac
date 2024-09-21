import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Schedule } from '../../../types/api';
import { addDays, startOfWeek } from 'date-fns';

export interface SchedulesQueryParams {
  weekStart?: string;
  weekEnd?: string;
  searchTerm?: string;
  groupId?: string;
  userId?: string;
}

export const getSchedules = ({
  weekStart = startOfWeek(Date.now(), { weekStartsOn: 1 }).toISOString(),
  weekEnd = addDays(
    startOfWeek(Date.now(), { weekStartsOn: 1 }),
    7
  ).toISOString(),
  searchTerm = '',
  groupId = '',
  userId = '',
}): Promise<{
  data: Schedule[];
}> => {
  return api.get(`/schedules`, {
    params: {
      weekStart,
      weekEnd,
      searchTerm,
      groupId,
      userId,
    },
  });
};

export const getSchedulesQueryOptions = ({
  weekStart,
  weekEnd,
  searchTerm,
  groupId,
  userId,
}: SchedulesQueryParams) => {
  return queryOptions({
    queryKey: [
      'schedules',
      { weekStart, weekEnd, searchTerm, groupId, userId },
    ],
    queryFn: () =>
      getSchedules({ weekStart, weekEnd, searchTerm, groupId, userId }),
  });
};

type UseSchedulesOptions = {
  weekStart?: string;
  weekEnd?: string;
  searchTerm?: string;
  groupId?: string;
  userId?: string;
  queryConfig?: QueryConfig<typeof getSchedulesQueryOptions>;
};

export const useSchedules = ({
  queryConfig,
  weekStart,
  weekEnd,
  searchTerm,
  groupId,
  userId,
}: UseSchedulesOptions) => {
  return useQuery({
    ...getSchedulesQueryOptions({
      weekStart,
      weekEnd,
      searchTerm,
      groupId,
      userId,
    }),
    ...queryConfig,
  });
};
