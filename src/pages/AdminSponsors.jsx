// src/pages/AdminSponsors.jsx
import { useState, useEffect } from 'react';
import { getSponsors } from '../services/sponsorsService';
import { createSponsor, updateSponsor, deleteSponsor, uploadImage } from '../services/adminService';
import { PlusCircle, Edit, Trash2, Loader, Heart } from 'lucide-react';

const AdminSponsors = () => {
  console.log('📄 [Page Load] Renderizando la página: AdminSponsors');
  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    link: '',
    logoUrl: '',
    orden: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      setIsLoading(true);
      const data = await getSponsors();
      setSponsors(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los sponsors.');
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
      setFormData(item);
    } else {
      setFormData({ nombre: '', link: '', logoUrl: '', orden: 0 });
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

    let finalLogoUrl = currentItem ? formData.logoUrl : '';

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile, { preset: 'logo' });
      if (uploadedUrl) {
        finalLogoUrl = uploadedUrl;
      } else {
        setError('Error al subir el logo.');
        setIsUploading(false);
        return;
      }
    }

    const dataToSave = { ...formData, logoUrl: finalLogoUrl };

    try {
      if (currentItem) {
        await updateSponsor(currentItem.id, dataToSave);
      } else {
        await createSponsor(dataToSave);
      }
      fetchSponsors();
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar el sponsor.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id, logoUrl) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este sponsor?')) {
      try {
        await deleteSponsor(id, logoUrl);
        fetchSponsors();
      } catch (err) {
        setError('Error al eliminar el sponsor.');
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando sponsors...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Sponsors</h1>
        <button onClick={() => handleOpenModal()} className="bg-verdeUnicen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <PlusCircle className="mr-2" /> Añadir Sponsor
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-between">
            <img src={sponsor.logoUrl} alt={sponsor.nombre} className="max-h-24 max-w-full object-contain mb-4" />
            <div className="text-center">
                <h2 className="font-bold">{sponsor.nombre}</h2>
                <p className="text-xs text-gray-500">Orden: {sponsor.orden}</p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={() => handleOpenModal(sponsor)} className="text-blue-500 hover:text-blue-700"><Edit /></button>
              <button onClick={() => handleDelete(sponsor.id, sponsor.logoUrl)} className="text-red-500 hover:red-700"><Trash2 /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Editar' : 'Añadir'} Sponsor</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Link (URL)</label>
                <input type="url" name="link" value={formData.link} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3" placeholder="https://ejemplo.com"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Orden</label>
                <input type="number" name="orden" value={formData.orden} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Logo</label>
                <input type="file" name="logo" onChange={handleFileChange} className="w-full" />
                {currentItem && formData.logoUrl && <img src={formData.logoUrl} alt="Preview" className="w-32 h-32 object-contain mt-2 bg-gray-100 p-2 rounded" />}
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

export default AdminSponsors;