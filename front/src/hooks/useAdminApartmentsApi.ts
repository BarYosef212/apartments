
import { getAuthHeaders } from '../lib/auth';
import { api } from '../api/api';
import {
  UseAdminApartmentsApi,
  ApartmentsResponse,
} from '../types/customHooks.types';

export function useAdminApartmentsApi(): UseAdminApartmentsApi {

  const fetchAdminApartments = async (params: Record<string, string>) => {
    try {
      const res = await api.get<ApartmentsResponse>(`/apartments`, {
        params,
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching admin apartments:", error);
      throw error;
    }
  }

  const createApartment = async (payload: any) => {
    try {
      await api.post(`/apartments`, payload, {
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error("Error creating apartment:", error);
      throw error;
    }
  };

  const updateApartment = async (id: string, payload: any) => {
    try {
      await api.put(`/apartments/${id}`, payload, {
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error("Error updating apartment:", error);
      throw error;
    }
  };

  const deleteApartment = async (id: string) => {
    try {
      await api.delete(`/apartments/${id}`, {
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error("Error deleting apartment:", error);
      throw error;
    }
  };

  return {
    fetchAdminApartments,
    createApartment,
    updateApartment,
    deleteApartment,
  };
}