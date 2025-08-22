// src/pages/AdminEntrenadores.jsx
import { useState, useEffect } from 'react';
import { getEntrenadores, createEntrenador, updateEntrenador, deleteEntrenador } from '../services/quienesSomosService';
import { PlusCircle, Edit, Trash2, Users } from 'lucide-react';

const AdminEntrenadores = () => {
  const [entrenadores, setEntrenadores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    roles: '', // Se manejará como un string separado por comas
    orden: 0,
  });

  useEffect(() => {
    fetchEntrenadores();
  }, []);

  const fetchEntrenadores = async () => {
    try {
      setIsLoading(true);
      const data = await getEntrenadores();
      setEntrenadores(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los entrenadores.');
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
        nombre: item.nombre,
        roles: Array.isArray(item.roles) ? item.roles.join(', ') : '',
        orden: item.orden,
      });
    } else {
      setFormData({ nombre: '', roles: '', orden: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      roles: formData.roles.split(',').map(role => role.trim()), // Convertir string a array
    };

    try {
      if (currentItem) {
        await updateEntrenador(currentItem.id, dataToSave);
      } else {
        await createEntrenador(dataToSave);
      }
      fetchEntrenadores();
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar el entrenador.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este entrenador?')) {
      try {
        await deleteEntrenador(id);
        fetchEntrenadores();
      } catch (err) {
        setError('Error al eliminar el entrenador.');
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando entrenadores...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Cuerpo Técnico</h1>
        <button onClick={() => handleOpenModal()} className="bg-verdeUnicen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <PlusCircle className="mr-2" /> Añadir Entrenador
        </button>
      </div>

      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">Orden</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">Roles</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {entrenadores.map((entrenador) => (
              <tr key={entrenador.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{entrenador.orden}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{entrenador.nombre}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {entrenador.roles.map((rol, index) => (
                      <span key={index} className="bg-azulUnicen text-white px-2 py-1 text-xs font-medium rounded-full">{rol}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleOpenModal(entrenador)} className="text-blue-500 hover:text-blue-700"><Edit /></button>
                    <button onClick={() => handleDelete(entrenador.id)} className="text-red-500 hover:text-red-700"><Trash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Editar' : 'Añadir'} Entrenador</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roles">Roles (separados por coma)</label>
                <input type="text" name="roles" value={formData.roles} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="Ej: Profesor, Director Técnico" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orden">Orden</label>
                <input type="number" name="orden" value={formData.orden} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
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

export default AdminEntrenadores;