import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../../lib/adminAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
}
