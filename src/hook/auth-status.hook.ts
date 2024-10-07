import { getCookie } from 'cookies-next';

export function useAuthStatus() {
  const isAuthenticated = !!getCookie('thrive.auth_token');
  return {
    isAuthenticated,
  };
}
