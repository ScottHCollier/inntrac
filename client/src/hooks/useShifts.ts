import { useState, useEffect } from 'react';
import agent from '../api/agent';
import { UserShift } from '../models';

interface UseUsersResult {
  users: UserShift[];
  usersLoading: boolean;
  usersError: Error | null;
}

const useUserShifts = (params: URLSearchParams): UseUsersResult => {
  const [users, setUsers] = useState<UserShift[]>([]);
  const [usersLoading, setLoading] = useState<boolean>(true);
  const [usersError, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await agent.Shifts.getShifts(params);
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

export default useUserShifts;
