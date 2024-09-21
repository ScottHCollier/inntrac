import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Group } from '@/types/api';

export const getGroups = (): Promise<{ data: Group[] }> => {
  return api.get('/groups');
};

export const getGroupsQueryOptions = () => {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: () => getGroups(),
  });
};

type UseGroupsOptions = {
  queryConfig?: QueryConfig<typeof getGroupsQueryOptions>;
};

export const useGroups = ({ queryConfig = {} }: UseGroupsOptions = {}) => {
  return useQuery({
    ...getGroupsQueryOptions(),
    ...queryConfig,
  });
};
