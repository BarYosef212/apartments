import { api } from '../api/api';
import { UseAuthApi } from '../types/customHooks.types';


export function useAuthApi(): UseAuthApi {
  const login = async (email: string, password: string) => {
    try {
      const res = await api.post<{ token: string }>(`/auth/login`, {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  return {
    login,
  };
}
