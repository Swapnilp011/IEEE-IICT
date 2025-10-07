'use client';

import { useState, useEffect } from 'react';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';

/**
 * Interface defining the shape of the user authentication state.
 */
export interface UserAuthState {
  user: User | null;         // The Firebase User object or null if not logged in.
  isUserLoading: boolean;      // True during the initial check for authentication state.
  userError: Error | null; // Any error that occurred during authentication state checking.
}

/**
 * A React hook to get the current authenticated user from Firebase Authentication.
 *
 * This hook abstracts the `onAuthStateChanged` listener to provide a simple,
 * declarative way to access the user's authentication state within your components.
 * It manages the loading and error states for you.
 *
 * @param {Auth} auth - The Firebase Auth instance. It's crucial that this instance is
 *                      stable across re-renders to avoid re-subscribing unnecessarily.
 *                      Memoize it with `useMemo` if it's created within a component.
 *
 * @returns {UserAuthState} An object containing:
 *  - `user`: The `User` object if authenticated, otherwise `null`.
 *  - `isUserLoading`: A boolean that is `true` while the initial authentication
 *    state is being determined, and `false` thereafter.
 *  - `userError`: An `Error` object if the `onAuthStateChanged` listener fails,
 *    otherwise `null`.
 *
 * @example
 * // In a component that needs to know about the user
 * import { useAuth } from './firebase'; // Assuming you have a hook to get the auth instance
 * import { useUser } from './useUser';
 *
 * function UserProfile() {
 *   const auth = useAuth();
 *   const { user, isUserLoading, userError } = useUser(auth);
*
 *   if (isUserLoading) {
 *     return <div>Loading user...</div>;
 *   }
 *
 *   if (userError) {
 *     return <div>Error: {userError.message}</div>;
 *   }
 *
 *   if (user) {
 *     return <div>Welcome, {user.displayName}!</div>;
 *   }
 *
 *   return <div>Please sign in.</div>;
 * }
 */
export function useUser(auth: Auth | null): UserAuthState {
  const [authState, setAuthState] = useState<UserAuthState>({
    user: auth?.currentUser ?? null,
    isUserLoading: true,
    userError: null,
  });

  useEffect(() => {
    if (!auth) {
      setAuthState({ user: null, isUserLoading: false, userError: null });
      return;
    }

    setAuthState(prev => ({ ...prev, isUserLoading: true }));

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAuthState({ user, isUserLoading: false, userError: null });
      },
      (error) => {
        console.error('useUser: onAuthStateChanged error:', error);
        setAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );

    return () => unsubscribe();
  }, [auth]); 

  return authState;
}
