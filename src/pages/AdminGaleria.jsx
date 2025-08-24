// src/pages/AdminGaleria.jsx
import { useState, useEffect } from 'react';
import { getGaleria } from '../services/quienesSomosService';
import { createGaleriaItem, updateGaleriaItem, deleteGaleriaItem, uploadImage } from '../services/adminService';
import { PlusCircle, Edit, Trash2, Loader, Image as ImageIcon } from 'lucide-react'; // Añadidos Loader e ImageIcon

const AdminGaleria = () => {
  console.log('📄 [Page Load] Renderizando la página: AdminGaleria');
  const [galeria, setGaleria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    orden: 0,
    imagenUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchGaleria();
  }, []);

  const fetchGaleria = async () => {
    try {
      setIsLoading(true);
      const data = await getGaleria();
      setGaleria(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar la galería.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'orden' ? parseInt(value) : value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    if (item) {
      setFormData({
        titulo: item.titulo,
        descripcion: item.descripcion,
        orden: item.orden,
        imagenUrl: item.imagenUrl,
      });
    } else {
      setFormData({ titulo: '', descripcion: '', orden: 0, imagenUrl: '' });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = currentItem ? formData.imagenUrl : '';

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        setError('Error al subir la imagen.');
        setIsUploading(false);
        return;
      }
    }

    const dataToSave = { ...formData, imagenUrl: finalImageUrl };

    try {
      if (currentItem) {
        await updateGaleriaItem(currentItem.id, dataToSave);
      } else {
        await createGaleriaItem(dataToSave);
      }
      fetchGaleria();
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar el item.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este item?')) {
      try {
        await deleteGaleriaItem(id, imageUrl);
        fetchGaleria();
      } catch (err) {
        setError('Error al eliminar el item.');
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando galería...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Galería "Quiénes Somos"</h1>
        <button onClick={() => handleOpenModal()} className="bg-verdeUnicen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <PlusCircle className="mr-2" /> Añadir Nuevo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galeria.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.imagenUrl} alt={item.titulo} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{item.titulo} (Orden: {item.orden})</h2>
              <p className="text-gray-700 text-base">{item.descripcion}</p>
            </div>
            <div className="p-4 bg-gray-100 flex justify-end gap-2">
              <button onClick={() => handleOpenModal(item)} className="text-blue-500 hover:text-blue-700">
                <Edit />
              </button>
              <button onClick={() => handleDelete(item.id, item.imagenUrl)} className="text-red-500 hover:text-red-700">
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Editar' : 'Añadir'} Item de Galería</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">Título</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orden">Orden</label>
                <input type="number" name="orden" value={formData.orden} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                <input type="file" name="imagen" onChange={handleFileChange} className="w-full" />
                {currentItem && formData.imagenUrl && <img src={formData.imagenUrl} alt="Preview" className="w-32 h-32 object-cover mt-2" />}
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                <button type="submit" disabled={isUploading} className="bg-azulUnicen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {isUploading ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGaleria;