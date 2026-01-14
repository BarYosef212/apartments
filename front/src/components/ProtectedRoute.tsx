import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';
import { ProtectedRouteProps } from '../types/component.types';

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
