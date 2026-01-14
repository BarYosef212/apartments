import {jwtDecode} from 'jwt-decode';

export const TOKEN_KEY = 'apartments_admin_token';

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  const decoded = jwtDecode(token);
  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    clearToken();
    return false;
  }
  return true;
}

export function getAuthHeaders() {
  const token = getToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}


