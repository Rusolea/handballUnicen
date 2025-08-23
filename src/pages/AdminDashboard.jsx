import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNewsAdmin, deleteNews } from '../services/adminService';
import { useAuth } from '../hooks/useAuth';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Newspaper, 
  Users, 
  Trophy, 
  Calendar,
  LogOut,
  Shield,
  Image, // <--- Añadir ícono de Imagen
  FileText, // <--- Añadir ícono de Texto
  ClipboardList, // <--- Añadir ícono
  Trophy as TrophyIcon, // <--- Renombrar para evitar conflictos
  Users as UsersIcon,
  Heart,
  Home as HomeIcon, // <-- Importar y renombrar
  Link as LinkIcon // <-- Importar y renombrar
} from 'lucide-react';

const AdminDashboard = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();

  const fetchNoticias = async () => {
    setLoading(true);
    try {
      const noticiasData = await getAllNewsAdmin();
      setNoticias(noticiasData);
    } catch (error) {
      console.error('Error fetching noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      try {
        await deleteNews(id);
        // Actualizar la lista de noticias después de eliminar
        fetchNoticias(); 
      } catch (error) {
        console.error('Error al eliminar la noticia:', error);
        alert('Hubo un error al eliminar la noticia.');
      }
    }
  };

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
        <div className="mb-8">
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
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6">
            <h3 className="text-md font-semibold text-gray-700 mb-4">Gestión de Noticias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
            
            <h3 className="text-md font-semibold text-gray-700 mb-4">Gestión Página "Quiénes Somos"</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/admin/galeria"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Galería de Fotos</h3>
                  <p className="text-sm text-gray-600">Gestionar imágenes</p>
                </div>
              </Link>

              <Link
                to="/admin/entrenadores"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Cuerpo Técnico</h3>
                  <p className="text-sm text-gray-600">Gestionar entrenadores</p>
                </div>
              </Link>

              <Link
                to="/admin/textos-quienes-somos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Textos de la Página</h3>
                  <p className="text-sm text-gray-600">Editar historia y valores</p>
                </div>
              </Link>
            </div>

            <hr className="my-6" />

            <h3 className="text-md font-semibold text-gray-700 mb-4">Gestión Página "Qué Hacemos"</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <Link
                to="/admin/actividades"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Actividades</h3>
                  <p className="text-sm text-gray-600">Gestionar actividades</p>
                </div>
              </Link>

              <Link
                to="/admin/categorias"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
                  <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Categorías</h3>
                  <p className="text-sm text-gray-600">Gestionar categorías</p>
                </div>
              </Link>

              <Link
                to="/admin/torneos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <TrophyIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Torneos</h3>
                  <p className="text-sm text-gray-600">Gestionar torneos</p>
                </div>
              </Link>

               <Link
                to="/admin/textos-que-hacemos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Textos de la Página</h3>
                  <p className="text-sm text-gray-600">Editar títulos y listas</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Gestión de Home */}
        <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Gestión Página de Inicio (Home)</h2>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/admin/quick-links"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
                    >
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                            <LinkIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Accesos Rápidos</h3>
                            <p className="text-sm text-gray-600">Gestionar los 4 enlaces principales</p>
                        </div>
                    </Link>
                     <Link
                        to="/admin/textos-home"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center mr-3">
                            <HomeIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Textos del Home</h3>
                            <p className="text-sm text-gray-600">Editar títulos y párrafos</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

        {/* Gestión de Sponsors */}
        <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Gestión de Sponsors</h2>
            </div>
            <div className="p-6">
                <Link
                    to="/admin/sponsors"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors duration-200"
                >
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                        <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">Gestionar Sponsors</h3>
                        <p className="text-sm text-gray-600">Añadir, editar o eliminar sponsors</p>
                    </div>
                </Link>
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
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {noticias.map((noticia) => (
                    <tr key={noticia.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 truncate" style={{ maxWidth: '150px' }}>
                          {noticia.titulo}
                        </div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {formatDate(noticia.fecha)}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(noticia.fecha)}
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                        {noticia.categoria && (
                          <span className="px-2 py-1 text-xs font-medium bg-azulUnicen text-white rounded-full">
                            {noticia.categoria}
                          </span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          noticia.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {noticia.status === 'published' ? 'Publicado' : 'Borrador'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex items-center justify-center space-x-3">
                          <Link
                            to={`/admin/editar-noticia/${noticia.id}`}
                            className="text-azulUnicen hover:text-azulOscuroUnicen"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(noticia.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
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