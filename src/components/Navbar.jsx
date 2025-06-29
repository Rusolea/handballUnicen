import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoHandballUnicen from '../assets/logohandballUnicen.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Quiénes Somos', href: '/quienes-somos' },
    { name: 'Qué Hacemos', href: '/que-hacemos' },
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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src={logoHandballUnicen} 
                alt="Handball Unicen Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="ml-3 text-xl font-bold text-azulUnicen">
                Handball Unicen
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-azulUnicen bg-blue-50'
                    : 'text-gray-700 hover:text-azulUnicen hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {currentUser && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center text-sm text-gray-700 hover:text-azulUnicen"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-azulUnicen"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-azulUnicen hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-azulUnicen"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-azulUnicen bg-blue-50'
                    : 'text-gray-700 hover:text-azulUnicen hover:bg-blue-50'
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
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-azulUnicen hover:bg-blue-50"
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
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-azulUnicen hover:bg-blue-50"
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