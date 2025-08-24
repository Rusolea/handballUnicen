// src/pages/AdminTextoQueHacemos.jsx
import { useState, useEffect } from 'react';
import { getPaginaQueHacemos } from '../services/queHacemosService';
import { updatePaginaQueHacemos } from '../services/adminService';
import { Save, PlusCircle, Trash2 } from 'lucide-react';

const AdminTextoQueHacemos = () => {
  console.log('📄 [Page Load] Renderizando la página: AdminTextoQueHacemos');
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTextos();
  }, []);

  const fetchTextos = async () => {
    try {
      setIsLoading(true);
      const data = await getPaginaQueHacemos();
      setFormData(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los textos.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleListItemChange = (e, index, listName) => {
    const newList = [...formData[listName]];
    newList[index] = e.target.value;
    setFormData(prev => ({ ...prev, [listName]: newList }));
  };
  
  const addListItem = (listName) => {
    const newList = [...(formData[listName] || []), ''];
    setFormData(prev => ({ ...prev, [listName]: newList }));
  };

  const removeListItem = (index, listName) => {
    const newList = formData[listName].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [listName]: newList }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess('');
    setError(null);
    try {
      await updatePaginaQueHacemos(formData);
      setSuccess('¡Textos guardados correctamente!');
      setTimeout(() => setSuccess(''), 3000);
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
      <h1 className="text-3xl font-bold mb-6">Gestionar Textos de "Qué Hacemos"</h1>
      
      {error && <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <fieldset className="border p-4 rounded">
                <legend className="text-xl font-semibold px-2">Encabezados de Sección</legend>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Actividades</label>
                    <input type="text" name="tituloActividades" value={formData.tituloActividades || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3" />
                    <input type="text" name="subtituloActividades" value={formData.subtituloActividades || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3 mt-2" />
                </div>
                 <div className="mb-4">
                    <label className="block font-bold mb-2">Categorías</label>
                    <input type="text" name="tituloCategorias" value={formData.tituloCategorias || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3" />
                    <input type="text" name="subtituloCategorias" value={formData.subtituloCategorias || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3 mt-2" />
                </div>
                 <div className="mb-4">
                    <label className="block font-bold mb-2">Torneos</label>
                    <input type="text" name="tituloTorneos" value={formData.tituloTorneos || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3" />
                    <input type="text" name="subtituloTorneos" value={formData.subtituloTorneos || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3 mt-2" />
                </div>
            </fieldset>

            <fieldset className="border p-4 rounded">
                 <legend className="text-xl font-semibold px-2">Información Adicional</legend>
                 <div className="mb-4">
                    <label className="block font-bold mb-2">Entrenamientos</label>
                    <input type="text" name="tituloEntrenamientos" value={formData.tituloEntrenamientos || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3" />
                    <textarea name="descripcionEntrenamientos" value={formData.descripcionEntrenamientos || ''} onChange={handleInputChange} rows="3" className="shadow border rounded w-full py-2 px-3 mt-2"></textarea>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Puntos de Entrenamiento</h4>
                    {formData.puntosEntrenamiento?.map((punto, index) => (
                        <div key={index} className="flex items-center mb-2">
                           <input type="text" value={punto} onChange={(e) => handleListItemChange(e, index, 'puntosEntrenamiento')} className="shadow border rounded w-full py-2 px-3"/>
                           <button type="button" onClick={() => removeListItem(index, 'puntosEntrenamiento')} className="ml-2 text-red-500"><Trash2/></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addListItem('puntosEntrenamiento')} className="text-sm text-blue-500 flex items-center"><PlusCircle size={16} className="mr-1"/> Añadir Punto</button>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Sedes</h4>
                     {formData.sedes?.map((sede, index) => (
                        <div key={index} className="flex items-center mb-2">
                           <input type="text" value={sede} onChange={(e) => handleListItemChange(e, index, 'sedes')} className="shadow border rounded w-full py-2 px-3"/>
                           <button type="button" onClick={() => removeListItem(index, 'sedes')} className="ml-2 text-red-500"><Trash2/></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addListItem('sedes')} className="text-sm text-blue-500 flex items-center"><PlusCircle size={16} className="mr-1"/> Añadir Sede</button>
                </div>
            </fieldset>
        </div>

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

export default AdminTextoQueHacemos;