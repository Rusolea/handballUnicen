// src/pages/AdminTextoHome.jsx
import { useState, useEffect } from 'react';
import { getPaginaHome, updatePaginaHome } from '../services/homeService';
import { Save, PlusCircle, Trash2 } from 'lucide-react';

const AdminTextoHome = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTextos = async () => {
      try {
        setIsLoading(true);
        const data = await getPaginaHome();
        setFormData(data);
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
  
  const handleListItemChange = (e, index) => {
    const newList = [...formData.valoresLista];
    newList[index] = e.target.value;
    setFormData(prev => ({ ...prev, valoresLista: newList }));
  };
  
  const addListItem = () => {
    const newList = [...(formData.valoresLista || []), ''];
    setFormData(prev => ({ ...prev, valoresLista: newList }));
  };

  const removeListItem = (index) => {
    const newList = formData.valoresLista.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, valoresLista: newList }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess('');
    try {
      await updatePaginaHome(formData);
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
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestionar Textos del Home</h1>
      {success && <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <fieldset className="border p-4 rounded">
                <legend className="text-xl font-semibold px-2">Sección Hero</legend>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Título Principal</label>
                    <input type="text" name="heroTitulo" value={formData.heroTitulo || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3"/>
                </div>
                 <div className="mb-4">
                    <label className="block font-bold mb-2">Subtítulo</label>
                    <textarea name="heroSubtitulo" value={formData.heroSubtitulo || ''} onChange={handleInputChange} rows="3" className="shadow border rounded w-full py-2 px-3"></textarea>
                </div>
            </fieldset>
            <fieldset className="border p-4 rounded">
                <legend className="text-xl font-semibold px-2">Sección Accesos Rápidos</legend>
                 <div className="mb-4">
                    <label className="block font-bold mb-2">Título</label>
                    <input type="text" name="quickLinksTitulo" value={formData.quickLinksTitulo || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3"/>
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Subtítulo</label>
                    <input type="text" name="quickLinksSubtitulo" value={formData.quickLinksSubtitulo || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3"/>
                </div>
            </fieldset>
        </div>
        <fieldset className="border p-4 rounded">
            <legend className="text-xl font-semibold px-2">Sección "Sobre Handball Unicen"</legend>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Título</label>
                        <input type="text" name="aboutTitulo" value={formData.aboutTitulo || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3"/>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Primer Párrafo</label>
                        <textarea name="aboutParrafo1" value={formData.aboutParrafo1 || ''} onChange={handleInputChange} rows="5" className="shadow border rounded w-full py-2 px-3"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Segundo Párrafo</label>
                        <textarea name="aboutParrafo2" value={formData.aboutParrafo2 || ''} onChange={handleInputChange} rows="5" className="shadow border rounded w-full py-2 px-3"></textarea>
                    </div>
                </div>
                 <div>
                    <label className="block font-bold mb-2">Título de Valores</label>
                    <input type="text" name="valoresTitulo" value={formData.valoresTitulo || ''} onChange={handleInputChange} className="shadow border rounded w-full py-2 px-3 mb-2"/>
                     <h4 className="font-semibold mb-2 mt-4">Lista de Valores</h4>
                    {formData.valoresLista?.map((item, index) => (
                        <div key={index} className="flex items-center mb-2">
                           <input type="text" value={item} onChange={(e) => handleListItemChange(e, index)} className="shadow border rounded w-full py-2 px-3"/>
                           <button type="button" onClick={() => removeListItem(index)} className="ml-2 text-red-500"><Trash2/></button>
                        </div>
                    ))}
                    <button type="button" onClick={addListItem} className="text-sm text-blue-500 flex items-center"><PlusCircle size={16} className="mr-1"/> Añadir Valor</button>
                </div>
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

export default AdminTextoHome;