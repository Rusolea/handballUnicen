import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsById, updateNews, deleteNews, uploadImage } from '../services/newsService';
import { ArrowLeft, Upload, Plus, X, Trash2, AlertTriangle, Loader } from 'lucide-react'; // <-- Añadir Loader
import imageCompression from 'browser-image-compression';

const EditarNoticia = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [noticia, setNoticia] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    resumen: '',
    rival: '',
    resultado: '',
    categoria: '',
    fecha: '',
    status: 'draft', // Valor inicial por defecto
  });
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imageSizeWarning, setImageSizeWarning] = useState(''); // <-- NUEVO ESTADO
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categorias = [
    'Partido',
    'Torneo',
    'Entrenamiento',
    'Evento',
    'Logro',
    'General'
  ];

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const data = await getNewsById(id); // <-- Usando el servicio
        if (data) {
          setNoticia(data);
          setFormData({
            titulo: data.titulo || '',
            resumen: data.resumen || '',
            rival: data.rival || '',
            resultado: data.resultado || '',
            categoria: data.categoria || '',
            fecha: data.fecha ? data.fecha.toDate().toISOString().split('T')[0] : '',
            status: data.status || 'draft',
          });
          if (data.imagenUrl) {
            setImagenPreview(data.imagenUrl);
          }
        } else {
          setError('Noticia no encontrada');
        }
      } catch (error) {
        console.error('Error fetching noticia:', error);
        setError('Error al cargar la noticia');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // --- VALIDACIÓN DE TAMAÑO ---
      const fileSizeKB = file.size / 1024;
      const MAX_SIZE_KB = 200;

      if (fileSizeKB > MAX_SIZE_KB) {
        setImageSizeWarning(`¡Atención! La imagen pesa ${fileSizeKB.toFixed(1)} KB. Se recomienda que pese menos de ${MAX_SIZE_KB} KB para no afectar el rendimiento.`);
      } else {
        setImageSizeWarning(''); // Limpiar advertencia si el tamaño es correcto
      }
      // --- FIN DE LA VALIDACIÓN ---

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setImagen(compressedFile); // Guardar el archivo comprimido

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagenPreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        // Fallback al archivo original si la compresión falla
        setImagen(file);
        setImagenPreview(URL.createObjectURL(file));
      }
    }
  };

  const removeImagen = () => {
    setImagen(null);
    setImagenPreview(null);
    setFormData(prev => ({ ...prev, imagenUrl: '' })); // Marcar para eliminar la imagen existente
    setImageSizeWarning(''); // <-- Limpiar advertencia al quitar imagen
    document.getElementById('imagen-upload').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      let imagenUrl = noticia?.imagenUrl || null;
      if (imagen) {
        // Nota: Si se sube una imagen nueva, la antigua no se borra automáticamente
        // hasta que se guarde. Una mejora futura podría ser borrarla antes.
        imagenUrl = await uploadImage(imagen); // <-- Usando el servicio
      }

      const noticiaData = {
        ...formData,
        imagenUrl,
        fecha: new Date(formData.fecha),
      };

      await updateNews(id, noticiaData); // <-- Usando el servicio
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating noticia:', error);
      setError('Error al actualizar la noticia. Por favor, intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await deleteNews(id); // <-- Usando el servicio
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error deleting noticia:', error);
      setError('Error al eliminar la noticia. Por favor, intenta de nuevo.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-azulUnicen animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (error && !noticia) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="btn-primary"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Volver
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                Editar Noticia
              </h1>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Editar Información de la Noticia
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Título */}
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                value={formData.titulo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azulUnicen focus:border-transparent"
                placeholder="Ej: Victoria histórica en el torneo regional"
              />
            </div>

            {/* Resumen */}
            <div>
              <label htmlFor="resumen" className="block text-sm font-medium text-gray-700 mb-2">
                Resumen *
              </label>
              <textarea
                id="resumen"
                name="resumen"
                required
                rows={4}
                value={formData.resumen}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azulUnicen focus:border-transparent"
                placeholder="Describe brevemente la noticia..."
              />
            </div>

            {/* Fecha */}
            <div>
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha *
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                required
                value={formData.fecha}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azulUnicen focus:border-transparent"
              />
            </div>

            {/* Categoría */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azulUnicen focus:border-transparent"
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Rival */}
            <div>
              <label htmlFor="rival" className="block text-sm font-medium text-gray-700 mb-2">
                Rival (si aplica)
              </label>
              <input
                type="text"
                id="rival"
                name="rival"
                value={formData.rival}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azulUnicen focus:border-transparent"
                placeholder="Ej: Universidad de La Plata"
              />
            </div>

            {/* Resultado */}
            <div>
              <label htmlFor="resultado" className="block text-sm font-medium text-gray-700 mb-2">
                Resultado (si aplica)
              </label>
              <input
                type="text"
                id="resultado"
                name="resultado"
                value={formData.resultado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azulUnicen focus:border-transparent"
                placeholder="Ej: Victoria 25-20"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === 'draft'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-azulUnicen border-gray-300 focus:ring-azulUnicen"
                  />
                  <span className="ml-2 text-gray-700">Borrador</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.status === 'published'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-azulUnicen border-gray-300 focus:ring-azulUnicen"
                  />
                  <span className="ml-2 text-gray-700">Publicado</span>
                </label>
              </div>
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen
              </label>
              <div className="space-y-4">
                {imagenPreview ? (
                  <div className="relative">
                    <img
                      src={imagenPreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImagen}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Haz clic para seleccionar una imagen
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG hasta 5MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImagenChange}
                      className="hidden"
                      id="imagen-upload"
                    />
                    <label
                      htmlFor="imagen-upload"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-azulUnicen hover:bg-azulOscuroUnicen cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Seleccionar Imagen
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Advertencia Educativa (amarilla, siempre visible) */}
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">¡Importante para el rendimiento!</p>
                  <p className="text-sm mt-1">
                    Para que el sitio cargue rápido, asegúrate de que tus imágenes estén optimizadas. Recomendamos que pesen menos de 200 KB. Puedes usar la herramienta gratuita{' '}
                    <a 
                      href="https://squoosh.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-semibold underline hover:text-yellow-900"
                    >
                      Squoosh.app
                    </a> 
                    {' '}para comprimirlas antes de subirlas.
                  </p>
                </div>
              </div>
            </div>

            {/* --- ADVERTENCIA DE TAMAÑO (ROJA, CONDICIONAL) --- */}
            {imageSizeWarning && (
              <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-800 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{imageSizeWarning}</p>
                  </div>
                </div>
              </div>
            )}
            {/* ----------------------------------------------- */}

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </div>
                ) : (
                  'Guardar Cambios'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar Eliminación
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar esta noticia? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarNoticia; 