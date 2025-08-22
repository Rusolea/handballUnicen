import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Muestra un spinner o similar mientras se verifica el estado de autenticación y el rol.
    // Es importante para evitar un "flash" de la página de login.
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azulUnicen"></div>
      </div>
    );
  }

  // Ahora currentUser contiene el perfil completo, incluyendo el rol.
  // Permitimos el acceso si el usuario existe y su rol es 'admin'.
  const isAdmin = currentUser && currentUser.role === 'admin';

  return isAdmin ? children : <Navigate to="/admin" />;
};

export default PrivateRoute; 