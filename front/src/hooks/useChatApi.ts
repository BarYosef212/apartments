import { api } from '../api/api';
import { UseChatApi, ChatResponse } from '../types/customHooks.types';


export function useChatApi(): UseChatApi {
  const sendChatMessage = async (message: string, isAgentMode: boolean) => {
    try {
      let res = null
      if (isAgentMode) {
        res = await api.post<ChatResponse>(`/apartments/agent`, { message });
      } else {
        res = await api.post<ChatResponse>(`/apartments/agent`, { message });
        // res = await api.post<ChatResponse>(`/apartments/chat`, { message });
      }
      return res.data;
    } catch (error) {
      console.error("Error sending chat message:", error);
      throw error;
    }
  };

  return {
    sendChatMessage,
  };
}
