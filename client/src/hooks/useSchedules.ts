import { useState, useEffect } from 'react';
import agent from '../api/agent';
import { UserSchedule } from '../models';

interface UseUsersResult {
  users: UserSchedule[];
  usersLoading: boolean;
  usersError: Error | null;
}

const useUserSchedules = (params: URLSearchParams): UseUsersResult => {
  const [users, setUsers] = useState<UserSchedule[]>([]);
  const [usersLoading, setLoading] = useState<boolean>(true);
  const [usersError, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await agent.Schedules.getSchedules(params);
        setUsers(response.items);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [params]);

  return { users, usersLoading, usersError };
};

export default useUserSchedules;
