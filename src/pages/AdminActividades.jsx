// src/pages/AdminActividades.jsx
import { useState, useEffect } from 'react';
import { getActividades, createActividad, updateActividad, deleteActividad } from '../services/queHacemosService';
import { PlusCircle, Edit, Trash2, Target, Trophy, Users, Calendar, Clock, MapPin } from 'lucide-react';

// Mapeo de strings a componentes de íconos
const iconMap = {
  Target: <Target />,
  Trophy: <Trophy />,
  Users: <Users />,
  Calendar: <Calendar />,
};

const AdminActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    horarios: '',
    lugar: '',
    icon: 'Target', // Valor por defecto
    orden: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getActividades();
      setActividades(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las actividades.');
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
      setFormData({
        title: item.title,
        description: item.description,
        horarios: item.horarios,
        lugar: item.lugar,
        icon: item.icon,
        orden: item.orden,
      });
    } else {
      setFormData({ title: '', description: '', horarios: '', lugar: '', icon: 'Target', orden: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await updateActividad(currentItem.id, formData);
      } else {
        await createActividad(formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar la actividad.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      try {
        await deleteActividad(id);
        fetchData();
      } catch (err) {
        setError('Error al eliminar la actividad.');
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando actividades...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Actividades</h1>
        <button onClick={() => handleOpenModal()} className="bg-verdeUnicen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <PlusCircle className="mr-2" /> Añadir Actividad
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {actividades.map((actividad) => (
          <div key={actividad.id} className="bg-white rounded-lg shadow-md p-6 relative">
             <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => handleOpenModal(actividad)} className="text-blue-500 hover:text-blue-700"><Edit size={20} /></button>
                <button onClick={() => handleDelete(actividad.id)} className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
             </div>
            <div className="flex items-start">
              <div className="w-16 h-16 bg-limaUnicen rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <div className="w-8 h-8 text-white">{iconMap[actividad.icon]}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{actividad.title} (Orden: {actividad.orden})</h3>
                <p className="text-gray-600 mb-4">{actividad.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500"><Clock className="w-4 h-4 mr-2" />{actividad.horarios}</div>
                  <div className="flex items-center text-sm text-gray-500"><MapPin className="w-4 h-4 mr-2" />{actividad.lugar}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Editar' : 'Añadir'} Actividad</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Horarios</label>
                <input type="text" name="horarios" value={formData.horarios} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" />
              </div>
               <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Lugar</label>
                <input type="text" name="lugar" value={formData.lugar} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Icono</label>
                  <select name="icon" value={formData.icon} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3">
                    {Object.keys(iconMap).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Orden</label>
                  <input type="number" name="orden" value={formData.orden} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
                </div>
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

export default AdminActividades;