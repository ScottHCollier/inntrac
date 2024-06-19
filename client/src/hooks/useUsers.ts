import { useState, useEffect } from 'react';
import agent from '@/api/agent';
import { IUser } from '@/models';

interface UseUsersResult {
  users: IUser[];
  loading: boolean;
  error: Error | null;
}

const useUsers = (params: URLSearchParams): UseUsersResult => {
  const [users, setUsers] = useState<IUser[]>([]);
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
