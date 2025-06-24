import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';

const NuevaNoticia = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    resumen: '',
    rival: '',
    resultado: '',
    categoria: '',
    fecha: new Date().toISOString().split('T')[0]
  });
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

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

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
  };

  const uploadImagen = async (file) => {
    if (!file) return null;
    
    const storageRef = ref(storage, `noticias/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imagenUrl = null;
      if (imagen) {
        imagenUrl = await uploadImagen(imagen);
      }

      const noticiaData = {
        ...formData,
        imagenUrl,
        fecha: new Date(formData.fecha),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'noticias'), noticiaData);
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
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creando...
                  </div>
                ) : (
                  'Crear Noticia'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevaNoticia; 