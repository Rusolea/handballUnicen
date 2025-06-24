import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Newspaper, 
  Users, 
  Trophy, 
  Calendar,
  LogOut,
  Shield
} from 'lucide-react';

const AdminDashboard = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'noticias'));
        const noticiasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNoticias(noticiasData);
      } catch (error) {
        console.error('Error fetching noticias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('es-AR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-azulUnicen rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Panel Administrativo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {currentUser?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-azulUnicen rounded-lg flex items-center justify-center mr-4">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Noticias</p>
                <p className="text-2xl font-bold text-gray-900">{noticias.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-verdeUnicen rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Jugadores</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-limaUnicen rounded-lg flex items-center justify-center mr-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Partidos</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-celesteUnicen rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mes</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/admin/nueva-noticia"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-azulUnicen hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-azulUnicen rounded-lg flex items-center justify-center mr-3">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Nueva Noticia</h3>
                  <p className="text-sm text-gray-600">Crear una nueva noticia</p>
                </div>
              </Link>

              <Link
                to="/noticias"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-verdeUnicen hover:bg-green-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-verdeUnicen rounded-lg flex items-center justify-center mr-3">
                  <Newspaper className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ver Noticias</h3>
                  <p className="text-sm text-gray-600">Ver todas las noticias</p>
                </div>
              </Link>

              <Link
                to="/"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-limaUnicen hover:bg-lime-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-limaUnicen rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ver Sitio</h3>
                  <p className="text-sm text-gray-600">Ir al sitio público</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Noticias */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Noticias Recientes</h2>
            <Link
              to="/admin/nueva-noticia"
              className="btn-primary text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Nueva Noticia
            </Link>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azulUnicen mx-auto mb-2"></div>
                <p className="text-gray-600">Cargando noticias...</p>
              </div>
            ) : noticias.length === 0 ? (
              <div className="p-6 text-center">
                <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No hay noticias publicadas</p>
                <Link
                  to="/admin/nueva-noticia"
                  className="btn-primary"
                >
                  Crear Primera Noticia
                </Link>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {noticias.slice(0, 5).map((noticia) => (
                    <tr key={noticia.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {noticia.titulo}
                        </div>
                        <div className="text-sm text-gray-500">
                          {noticia.rival && `vs ${noticia.rival}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(noticia.fecha)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {noticia.categoria && (
                          <span className="px-2 py-1 text-xs font-medium bg-azulUnicen text-white rounded-full">
                            {noticia.categoria}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/editar-noticia/${noticia.id}`}
                            className="text-azulUnicen hover:text-azulOscuroUnicen"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {
                              // Implementar eliminación
                              console.log('Eliminar noticia:', noticia.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 