import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import logoUnicenUrl from '../assets/logohandballUnicen.svg'; // Importar como URL

const Navbar = () => {
  console.log('⬆️ [Navbar] Renderizando (carga inmediata).');
  const [isOpen, setIsOpen] = useState(false);
  
  // Obtenemos el objeto de contexto completo de forma segura
  const authContext = useAuth(); 
  const currentUser = authContext ? authContext.currentUser : null;
  const logout = authContext ? authContext.logout : () => {};

  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Quiénes Somos', href: '/quienes-somos' },
    { name: 'Qué Hacemos', href: '/que-hacemos' },
    { name: 'Horarios', href: '/que-hacemos#horarios' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Noticias', href: '/noticias' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-azulUnicen shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src={logoUnicenUrl} 
                alt="Logo de Handball Unicen"
                className="w-12 h-12" 
                width="48" 
                height="48"
              />
              <span className="ml-3 text-xl font-bold text-white">
                Handball Unicen
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === item.href
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {currentUser && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center text-sm text-gray-200 hover:text-white"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-200 hover:text-white"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-azulUnicen border-t border-azulOscuroUnicen">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {currentUser && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 