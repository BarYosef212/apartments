import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';
import { COMPANY_NAME } from '@/config/constants';

function NavLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-sm transition-colors ${
        isActive ? 'text-gray-900 font-semibold' : 'text-muted-foreground hover:text-gray-900'
      }`}
    >
      {label}
    </Link>
  );
}

export function NavigationBar() {
  return (
    <header className='fixed inset-x-0 top-0 z-30 border-b border-border bg-white/90 backdrop-blur shadow-subtle'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 flex-wrap'>
        <Link
          to='/'
          className='text-base font-semibold tracking-tight text-gray-900 shrink-0'
        >
         {COMPANY_NAME}
        </Link>
        <nav className='flex items-center gap-4 md:gap-6 overflow-x-auto'>
          <NavLink to='/' label='דף הבית' />
          <NavLink to='/apartments' label='דירות' />
          {isAuthenticated() && <NavLink to='/admin' label='ניהול' />}
        </nav>
      </div>
    </header>
  );
}


