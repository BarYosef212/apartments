import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ChatMessage } from '../types/component.types';
import { useChatApi } from '../hooks/useChatApi';
interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isAgentMode: boolean;
  input: string;
  isLoading: boolean;

  setIsOpen: (isOpen: boolean) => void;
  setIsAgentMode: (isAgentMode: boolean) => void;
  sendMessage: (
    msg: string,
    agentMode: boolean,
    e?: React.FormEvent,
  ) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  setInput: (input: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const getInitialMessages = (): ChatMessage[] => {
  const savedMessages = sessionStorage.getItem('chatMessages');
  return savedMessages && savedMessages.length > 0
    ? JSON.parse(savedMessages)
    : [
        {
          role: 'assistant',
          content:
            'שלום! אני העוזר האישי שלך למציאת דירות. כתוב לי מה אתה מחפש (למשל: "דירת 3 חדרים בתל אביב ב-5,000,000 שקל").',
          isSearch: false,
        },
      ];
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const { sendChatMessage } = useChatApi();
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (msg: string, agentMode: boolean, e?: React.FormEvent) => {
    e?.preventDefault();
    if (!msg.trim() || isLoading) return;

    const userMessage = msg.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await sendChatMessage(userMessage, agentMode);
      if (res.error) {
        throw new Error(res.error);
      }

      if (!res.is_search) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: res.reply,
          },
        ]);
        return;
      }
      const results = res.results || [];
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply ? res.reply : '',
        },
        {
          role: 'assistant',
          content:
            results.length > 0
              ? `מצאתי ${results.length} דירות שיכולות להתאים לך:`
              : 'לא מצאתי דירות מתאימות לחיפוש שלך.',
          results: results,
        },
      ]);
    } catch (error: any) {
      console.error('Chat error', error);
      const errorMessage =
        error.response?.data?.error || error.message || 'שגיאה לא ידועה';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `מצטער, נתקלתי בשגיאה: ${errorMessage}. נסה שוב מאוחר יותר.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isAgentMode,
        input,
        isLoading,

        setMessages,
        setIsOpen,
        setIsAgentMode,
        sendMessage,
        setInput,
        setIsLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
