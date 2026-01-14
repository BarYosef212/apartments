import { Apartment } from '../types/apartment.types';
import { UseApartmentsApi, ApartmentsResponse } from '../types/customHooks.types';
import { api } from '../api/api';


export function useApartmentsApi(): UseApartmentsApi {

  const fetchCities = async () => {
    try {
      const res = await api.get<string[]>(`/apartments/cities`);
      return res.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }

  }


  const fetchTypes = async () => {
    try{
      const res = await api.get<string[]>(`/apartments/types`);
      return res.data;  
    }
    catch(error){
      console.error("Error fetching types:", error);
      return [];
    }
    
  }
   

  const fetchApartments = async (params: Record<string, string>) => {
    try {
      const res = await api.get<ApartmentsResponse>(`/apartments`, {
        params,
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching apartments:", error);
      throw error;
    }
  };

  const fetchApartmentsById = async (id: string) => {
    try {
      const res = await api.get<Apartment>(`/apartments/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching apartment by id:", error);
      throw error;
    }
  };

  const fetchPremiumProperties = async () => {
    try {
      const res = await api.get<Apartment[]>(`/apartments/premium`);
      return res.data;
    } catch (error) {
      console.error("Error fetching premium properties:", error);
      throw error;
    }
  }


  return {
    fetchCities,
    fetchTypes,
    fetchApartments,
    fetchApartmentsById,
    fetchPremiumProperties,
  };
}
