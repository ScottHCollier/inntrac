import { useState, useEffect } from 'react';
import agent from '../api/agent';
import { Site, Shift, Group } from '../models';

interface User {
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

interface UseUsersResult {
  users: User[];
  usersLoading: boolean;
  usersError: Error | null;
}

const useUserShifts = (params: URLSearchParams): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
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
