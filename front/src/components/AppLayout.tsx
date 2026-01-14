import React from 'react';
import { NavigationBar } from './NavigationBar';
import { ChatWidget } from './ChatWidget';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-background text-foreground' dir='rtl'>
      <NavigationBar />
      <main className='pt-20'>{children}</main>
      <ChatWidget />
    </div>
  );
}
