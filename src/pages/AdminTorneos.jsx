// src/pages/AdminTorneos.jsx
import { useState, useEffect } from 'react';
import { getTorneos, createTorneo, updateTorneo, deleteTorneo } from '../services/queHacemosService';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const AdminTorneos = () => {
  const [torneos, setTorneos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    ubicacion: '',
    estado: 'Próximo',
    descripcion: '',
    orden: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getTorneos();
      setTorneos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los torneos.');
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
      setFormData({ nombre: '', fecha: '', ubicacion: '', estado: 'Próximo', descripcion: '', orden: 0 });
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
        await updateTorneo(currentItem.id, formData);
      } else {
        await createTorneo(formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar el torneo.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este torneo?')) {
      try {
        await deleteTorneo(id);
        fetchData();
      } catch (err) {
        setError('Error al eliminar el torneo.');
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando torneos...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Torneos</h1>
        <button onClick={() => handleOpenModal()} className="bg-verdeUnicen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <PlusCircle className="mr-2" /> Añadir Torneo
        </button>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {torneos.map((torneo) => (
          <div key={torneo.id} className="bg-white rounded-lg shadow-md p-6 relative">
             <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => handleOpenModal(torneo)} className="text-blue-500 hover:text-blue-700"><Edit size={20} /></button>
                <button onClick={() => handleDelete(torneo.id)} className="text-red-500 hover:text-red-700"><Trash2 size={20} /></button>
             </div>
              <h3 className="text-lg font-bold mb-2">{torneo.nombre}</h3>
              <p className="text-sm text-gray-500 mb-1"><strong>Fecha:</strong> {torneo.fecha}</p>
              <p className="text-sm text-gray-500 mb-1"><strong>Ubicación:</strong> {torneo.ubicacion}</p>
              <p className="text-sm text-gray-500 mb-3">
                <strong>Estado:</strong> 
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  torneo.estado === 'En curso' ? 'bg-green-100 text-green-800' :
                  torneo.estado === 'Finalizado' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>{torneo.estado}</span>
              </p>
              <p className="text-gray-700 mb-1"><strong>Descripción:</strong> {torneo.descripcion}</p>
              <p className="text-sm text-gray-500"><strong>Orden:</strong> {torneo.orden}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Editar' : 'Añadir'} Torneo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
              </div>
               <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Fecha</label>
                  <input type="text" name="fecha" value={formData.fecha} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" />
                </div>
                 <div>
                  <label className="block text-gray-700">Ubicación</label>
                  <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3">
                    <option value="Próximo">Próximo</option>
                    <option value="En curso">En curso</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Orden</label>
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

export default AdminTorneos;