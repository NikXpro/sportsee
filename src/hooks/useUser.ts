/**
 * @fileoverview Custom hook for fetching and managing user data
 * @module useUser
 */

import { useEffect, useState } from "react";
import User from "../models/User";
import UserService from "../services/UserService";

/**
 * Return type for the useUser hook
 * @interface UseUserReturn
 * @property {User | null} user - The user data if successfully fetched, null otherwise
 * @property {boolean} isLoading - Loading state indicator
 * @property {Error | null} error - Error object if fetch failed, null otherwise
 */
interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch and manage user data
 * Handles loading states and error handling automatically
 *
 * @hook
 * @param {number} userId - The ID of the user to fetch
 * @returns {UseUserReturn} Object containing:
 * - user: The fetched user data or null
 * - isLoading: Boolean indicating if data is being fetched
 * - error: Any error that occurred during fetching
 *
 * @example
 * ```tsx
 * const { user, isLoading, error } = useUser(12);
 *
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 * if (!user) return null;
 *
 * return <UserProfile user={user} />;
 * ```
 */
export function useUser(userId: number): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    /**
     * Asynchronous function to fetch user data
     * Sets loading state and handles errors
     */
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
