// src/pages/AdminQuickLinks.jsx
import { useState, useEffect } from 'react';
import { getQuickLinks, createQuickLink, updateQuickLink, deleteQuickLink } from '../services/homeService';
import { PlusCircle, Edit, Trash2, Calendar, Users, Trophy, Newspaper } from 'lucide-react';

const iconMap = {
  Calendar: <Calendar />,
  Users: <Users />,
  Trophy: <Trophy />,
  Newspaper: <Newspaper />,
};

const AdminQuickLinks = () => {
  const [quickLinks, setQuickLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Calendar',
    href: '',
    color: 'bg-azulUnicen',
    orden: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getQuickLinks();
      setQuickLinks(data);
    } catch (err) {
      setError('Error al cargar los accesos rápidos.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'orden' ? parseInt(value) : value }));
  };

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData({ title: '', description: '', icon: 'Calendar', href: '', color: 'bg-azulUnicen', orden: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await updateQuickLink(currentItem.id, formData);
      } else {
        await createQuickLink(formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar el acceso rápido.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este acceso rápido?')) {
      try {
        await deleteQuickLink(id);
        fetchData();
      } catch (err) {
        setError('Error al eliminar el acceso rápido.');
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Accesos Rápidos (Home)</h1>
        <button onClick={() => handleOpenModal()} className="bg-verdeUnicen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <PlusCircle className="mr-2" /> Añadir Acceso Rápido
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link) => (
          <div key={link.id} className="bg-white rounded-lg shadow-md p-4 text-center relative">
            <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleOpenModal(link)} className="text-blue-500"><Edit size={18}/></button>
                <button onClick={() => handleDelete(link.id)} className="text-red-500"><Trash2 size={18}/></button>
            </div>
            <div className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <div className="w-8 h-8 text-white">{iconMap[link.icon]}</div>
            </div>
            <h3 className="font-bold">{link.title}</h3>
            <p className="text-sm text-gray-600">{link.description}</p>
            <p className="text-xs text-gray-400 mt-2">URL: {link.href}</p>
            <p className="text-xs text-gray-400">Orden: {link.orden}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Editar' : 'Añadir'} Acceso Rápido</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block">Título</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full border rounded p-2" required/>
                </div>
                <div className="mb-4">
                    <label className="block">Descripción</label>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded p-2"/>
                </div>
                 <div className="mb-4">
                    <label className="block">URL de destino (ej: /noticias)</label>
                    <input type="text" name="href" value={formData.href} onChange={handleInputChange} className="w-full border rounded p-2" required/>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block">Icono</label>
                        <select name="icon" value={formData.icon} onChange={handleInputChange} className="w-full border rounded p-2">
                            {Object.keys(iconMap).map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block">Color de fondo</label>
                        <select name="color" value={formData.color} onChange={handleInputChange} className="w-full border rounded p-2">
                            <option value="bg-azulUnicen">Azul</option>
                            <option value="bg-verdeUnicen">Verde</option>
                            <option value="bg-limaUnicen">Lima</option>
                            <option value="bg-celesteUnicen">Celeste</option>
                        </select>
                    </div>
                </div>
                 <div className="mb-4">
                    <label className="block">Orden</label>
                    <input type="number" name="orden" value={formData.orden} onChange={handleInputChange} className="w-full border rounded p-2" required/>
                </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
                <button type="submit" className="bg-azulUnicen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuickLinks;