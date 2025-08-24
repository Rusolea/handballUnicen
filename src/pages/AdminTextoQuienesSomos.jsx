// src/pages/AdminTextoQuienesSomos.jsx
import { useState, useEffect } from 'react';
import { getPaginaQuienesSomos } from '../services/quienesSomosService';
import { updatePaginaQuienesSomos } from '../services/adminService';
import { Save } from 'lucide-react';

const AdminTextoQuienesSomos = () => {
  console.log('📄 [Page Load] Renderizando la página: AdminTextoQuienesSomos');
  const [formData, setFormData] = useState({
    tituloHistoria: '',
    parrafoHistoria1: '',
    parrafoHistoria2: '',
    tituloValores: '',
    subtituloValores: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTextos = async () => {
      try {
        setIsLoading(true);
        const data = await getPaginaQuienesSomos();
        if (data) {
          setFormData(data);
        }
        setError(null);
      } catch (err) {
        setError('Error al cargar los textos.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTextos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess('');
    setError(null);
    try {
      await updatePaginaQuienesSomos(formData);
      setSuccess('¡Textos guardados correctamente!');
      setTimeout(() => setSuccess(''), 3000); // Ocultar mensaje después de 3 segundos
    } catch (err) {
      setError('Error al guardar los textos.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p className="text-center p-8">Cargando textos...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestionar Textos de "Quiénes Somos"</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <fieldset className="mb-8 border p-4 rounded">
          <legend className="text-xl font-semibold px-2">Sección de Historia</legend>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tituloHistoria">Título de la Historia</label>
            <input type="text" name="tituloHistoria" value={formData.tituloHistoria || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parrafoHistoria1">Primer Párrafo</label>
            <textarea name="parrafoHistoria1" value={formData.parrafoHistoria1 || ''} onChange={handleInputChange} rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parrafoHistoria2">Segundo Párrafo</label>
            <textarea name="parrafoHistoria2" value={formData.parrafoHistoria2 || ''} onChange={handleInputChange} rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"></textarea>
          </div>
        </fieldset>

        <fieldset className="mb-8 border p-4 rounded">
          <legend className="text-xl font-semibold px-2">Sección de Valores</legend>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tituloValores">Título de Valores</label>
            <input type="text" name="tituloValores" value={formData.tituloValores || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subtituloValores">Subtítulo de Valores</label>
            <input type="text" name="subtituloValores" value={formData.subtituloValores || ''} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button type="submit" disabled={isSaving} className="bg-azulUnicen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
            <Save className="mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTextoQuienesSomos;