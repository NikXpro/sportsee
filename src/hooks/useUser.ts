import { useEffect, useState } from "react";
import User from "../models/User";
import UserService from "../services/UserService";

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUser(userId: number): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await UserService.getUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Une erreur est survenue")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, isLoading, error };
}
