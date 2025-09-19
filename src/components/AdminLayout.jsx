// src/components/AdminLayout.jsx
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
      // Simplemente renderizamos el Outlet. El AuthProvider ya está en App.jsx
      <Outlet />
  );
};

export default AdminLayout; 