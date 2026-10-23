import useAuthStore from "../store/authStore";

export function getToken(): string | null {
  return useAuthStore.getState().token;
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
