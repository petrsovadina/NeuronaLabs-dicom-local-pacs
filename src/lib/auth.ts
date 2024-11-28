import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  role: string;
}

interface JWTPayload {
  nameid: string;
  email: string;
  role: string;
  exp: number;
}

export const AUTH_TOKEN_KEY = 'auth_token';

export function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
}

export function setToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getUser(): User | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    if (decoded.exp * 1000 < Date.now()) {
      removeToken();
      return null;
    }

    return {
      id: decoded.nameid,
      email: decoded.email,
      role: decoded.role
    };
  } catch {
    removeToken();
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}
