import { AUTH_ACCESS_TOKEN } from "@/constants/auth.constant";

/**
 * Loads token from session cookie
 */
export const getToken = () => {
  return sessionStorage.getItem(AUTH_ACCESS_TOKEN) as any;
};
/**
 * Save token and refresh token to session cookie,
 * Default value used for demo API
 */
export const saveToken = (token: string) => {
  sessionStorage.setItem(AUTH_ACCESS_TOKEN, token);
};
