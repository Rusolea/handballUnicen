// src/components/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import AuthProvider from '../contexts/AuthContext';

const AdminLayout = () => {
  return (
    <AuthProvider>
      {/* Outlet renderizará la ruta hija que coincida (Dashboard, NuevaNoticia, etc.) */}
      <Outlet />
    </AuthProvider>
  );
};

export default AdminLayout; 