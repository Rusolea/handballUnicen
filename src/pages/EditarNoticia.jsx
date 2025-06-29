import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { ArrowLeft, Upload, Plus, X, Trash2 } from 'lucide-react';

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
    fecha: ''
  });
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
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
        const docRef = doc(db, 'noticias', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNoticia(data);
          setFormData({
            titulo: data.titulo || '',
            resumen: data.resumen || '',
            rival: data.rival || '',
            resultado: data.resultado || '',
            categoria: data.categoria || '',
            fecha: data.fecha ? data.fecha.toDate().toISOString().split('T')[0] : ''
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
    setSaving(true);
    setError('');

    try {
      let imagenUrl = noticia?.imagenUrl || null;
      if (imagen) {
        imagenUrl = await uploadImagen(imagen);
      }

      const noticiaData = {
        ...formData,
        imagenUrl,
        fecha: new Date(formData.fecha),
        updatedAt: new Date()
      };

      const docRef = doc(db, 'noticias', id);
      await updateDoc(docRef, noticiaData);
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
      
      // Eliminar imagen del storage si existe
      if (noticia?.imagenUrl) {
        try {
          const imageRef = ref(storage, noticia.imagenUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }

      // Eliminar documento de Firestore
      const docRef = doc(db, 'noticias', id);
      await deleteDoc(docRef);
      
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azulUnicen mx-auto mb-4"></div>
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