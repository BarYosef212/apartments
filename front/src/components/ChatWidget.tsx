import { useEffect, useRef } from 'react';
import { ApartmentCard } from './ApartmentCard';
import { Apartment } from '../types/apartment.types';
import { Button, Input } from './ui';
import { HOUSE_PLACEHOLDER_IMAGE, ICONS_MAP } from '../config/constants';
import { ChatApartment } from '../types/apartment.types';
import { useChat } from '../contexts/ChatContext';
import Switch from './ui/switch';

function transformChatApartment(chatApt: ChatApartment): Apartment {
  return {
    ...chatApt,
    img: chatApt.img || HOUSE_PLACEHOLDER_IMAGE,
    info: chatApt.info || '',
  };
}

export function ChatWidget() {
  const {
    messages,
    isOpen,
    input,
    isLoading,
    isAgentMode,

    setIsOpen,
    sendMessage,
    setInput,
    setIsAgentMode,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 left-6 z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        aria-label="פתח צ'אט"
      >
        {isOpen ? (
          ICONS_MAP['close']
        ) : (
          ICONS_MAP['open']
        )}
      </button>

      {isOpen && (
        <div
          className='fixed bottom-20 left-3 right-3 md:bottom-24 md:left-6 md:right-auto z-40 flex h-[500px] md:h-[600px] w-auto md:w-[400px] max-h-[calc(100vh-100px)] flex-col rounded-lg border border-border bg-white shadow-2xl'
          dir='rtl'
        >
          <div className='flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground rounded-t-lg'>
            <h3 className='text-lg font-semibold'>צ'אט למציאת דירות</h3>
            <button
              onClick={() => setIsOpen(false)}
              className='rounded-full p-1 hover:bg-primary/80 transition-colors'
              aria-label='סגור'
            >
              {ICONS_MAP['x_icon']}
            </button>
          </div>

          <div
            ref={scrollRef}
            className='flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50'
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-2 ${
                  msg.role === 'user' ? 'items-start' : 'items-end'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-white text-foreground border border-border rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.results && msg.results.length > 0 && (
                  <div className='w-full space-y-3 mt-2'>
                    {msg.results.map((result, i) => {
                      const apartment = transformChatApartment(result);
                      return (
                        <div
                          key={apartment._id || i}
                          className='transform scale-90 origin-right'
                        >
                          <ApartmentCard apartment={apartment} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className='flex justify-end'>
                <div className='bg-white border border-border px-4 py-3 rounded-2xl rounded-bl-none text-sm animate-pulse'>
                  חושב...
                </div>
              </div>
            )}
          </div>
          {isAgentMode && (
            <div className='flex items-center gap-2 px-4 py-2 border-t border-border'>
              <span>מצב קביעת פגישה</span>
              <Switch
                checked={isAgentMode}
                onCheckedChange={(checked) => setIsAgentMode(checked)}
              />
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input, isAgentMode, e);
            }}
            className='border-t border-border bg-white p-4 rounded-b-lg'
          >
            <div className='flex gap-2'>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='תאר את הדירה שאתה מחפש...'
                className='flex-1'
                disabled={isLoading}
              />
              <Button type='submit' disabled={isLoading || !input.trim()}>
                שלח
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
