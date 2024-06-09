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
  status: number;
}

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: Error | null;
}

const useUsers = (params: URLSearchParams): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await agent.Users.getUsers(params);
        setUsers(response);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [params]);

  return { users, loading, error };
};

export default useUsers;
