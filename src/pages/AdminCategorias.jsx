// src/pages/AdminCategorias.jsx
import { useState, useEffect } from 'react';
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../services/queHacemosService';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    entrenador: '',
    horarios: '',
    orden: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getCategorias();
      setCategorias(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las categorías.');
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
      setFormData({ nombre: '', descripcion: '', entrenador: '', horarios: '', orden: 0 });
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
        await updateCategoria(currentItem.id, formData);
      } else {
        await createCategoria(formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError('Error al guardar la categoría.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      try {
        await deleteCategoria(id);
        fetchData();
      } catch (err) {
        setError('Error al eliminar la categoría.');
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando categorías...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Categorías</h1>
        <button onClick={() => handleOpenModal()} className="bg-verdeUnicen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
          <PlusCircle className="mr-2" /> Añadir Categoría
        </button>
      </div>

      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Orden</th>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Descripción</th>
              <th className="px-6 py-3 text-left">Horarios</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{item.orden}</td>
                <td className="px-6 py-4 border-b">{item.nombre}</td>
                <td className="px-6 py-4 border-b">{item.descripcion}</td>
                <td className="px-6 py-4 border-b">{item.horarios}</td>
                <td className="px-6 py-4 border-b">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleOpenModal(item)} className="text-blue-500 hover:text-blue-700"><Edit /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700"><Trash2 /></button>
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
            <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Editar' : 'Añadir'} Categoría</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <input type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Entrenador (Opcional)</label>
                <input type="text" name="entrenador" value={formData.entrenador} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Horarios</label>
                <textarea name="horarios" value={formData.horarios} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Orden</label>
                <input type="number" name="orden" value={formData.orden} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3" required />
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

export default AdminCategorias;