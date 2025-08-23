import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNews, uploadImage } from '../services/adminService'; // <-- CAMBIO
import { ArrowLeft, Upload, X, AlertTriangle } from 'lucide-react';
import { Loader } from 'lucide-react';

const NuevaNoticia = () => {
  console.log('📄 [Page Load] Renderizando la página: NuevaNoticia');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    resumen: '',
    rival: '',
    resultado: '',
    categoria: '',
    fecha: new Date().toISOString().split('T')[0],
    status: 'draft', // Valor por defecto
  });
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imageSizeWarning, setImageSizeWarning] = useState(''); // <-- NUEVO ESTADO

  const categorias = [
    'Partido',
    'Torneo',
    'Entrenamiento',
    'Evento',
    'Logro',
    'General'
  ];

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

      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImagen = () => {
    setImagen(null);
    setImagenPreview(null);
    setImageSizeWarning(''); // <-- Limpiar advertencia al quitar imagen
    document.getElementById('imagen-upload').value = '';
  };

  const handleSubmit = async (statusToSet) => {
    setLoading(true);
    setError('');

    try {
      let imagenUrl = null;
      if (imagen) {
        imagenUrl = await uploadImage(imagen); // <-- Usando el servicio
      }

      const noticiaData = {
        ...formData,
        status: statusToSet,
        imagenUrl,
        fecha: new Date(formData.fecha),
      };

      await createNews(noticiaData); // <-- Usando el servicio
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating noticia:', error);
      setError('Error al crear la noticia. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Volver
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              Crear Nueva Noticia
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Información de la Noticia
            </h2>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-6">
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
                      {/* Plus icon is not imported, so it's removed */}
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
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={loading}
                className="btn-secondary inline-flex items-center disabled:opacity-50"
              >
                {/* Save icon is not imported, so it's removed */}
                Guardar Borrador
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('published')}
                disabled={loading}
                className="btn-primary inline-flex items-center disabled:opacity-50"
              >
                {/* Send icon is not imported, so it's removed */}
                {loading ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevaNoticia; 