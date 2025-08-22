import { useState, useEffect } from 'react';
import { Users, Award, Target } from 'lucide-react';
import { getPaginaQuienesSomos, getEntrenadores, getGaleria } from '../services/quienesSomosService';
import { TailSpin } from 'react-loader-spinner';
import ContactoWhatsapp from '../components/ContactoWhatsapp'; // <-- Importar componente

const QuienesSomos = () => {
  const [textos, setTextos] = useState({});
  const [entrenadores, setEntrenadores] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mantengo los valores estáticos por ahora, ya que no se pidió gestionarlos desde el admin.
  // Si se quisiera, se añadirían a la colección `paginas`.
  const valores = [
    { icon: Target, title: 'ACTITUD' },
    { icon: Users, title: 'AMOR' },
    { icon: Award, title: 'RESPETO' },
  ];

  useEffect(() => {
    // Scroll al inicio de la página cuando se monta el componente
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [textosData, entrenadoresData, galeriaData] = await Promise.all([
          getPaginaQuienesSomos(),
          getEntrenadores(),
          getGaleria(),
        ]);
        setTextos(textosData);
        setEntrenadores(entrenadoresData);
        setGaleria(galeriaData);
        setError(null);
      } catch (err) {
        console.error("Error al cargar datos de 'Quiénes Somos':", err);
        setError('No se pudo cargar la información. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-verdeUnicen to-azulUnicen text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Quiénes Somos
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Conoce la historia, valores y el equipo que hace posible Handball Unicen
          </p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {textos.tituloHistoria}
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-left">
            {textos.parrafoHistoria1}
          </p>
          <p className="text-lg text-gray-600 mb-6 text-left">
            {textos.parrafoHistoria2}
          </p>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {textos.tituloValores}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {textos.subtituloValores}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-4xl mx-auto gap-8">
            {valores.map((valor) => (
              <div key={valor.title} className="card p-6 text-center">
                <div className="w-16 h-16 bg-azulUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                  <valor.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {valor.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entrenadores Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Cuerpo Técnico
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Profesionales comprometidos con el desarrollo deportivo de nuestros jugadores
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {entrenadores.map((entrenador) => (
              <div key={entrenador.id} className="card p-6 text-center flex flex-col items-center">
                <img 
                  src={entrenador.imagenUrl || 'https://via.placeholder.com/150'} 
                  alt={entrenador.nombre}
                  className="w-24 h-24 bg-gray-200 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {entrenador.nombre}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {entrenador.roles.map((rol, index) => (
                    <span key={index} className="bg-azulUnicen text-white px-3 py-1 text-xs font-medium rounded-full">
                      {rol}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Galería del Equipo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Momentos especiales y recuerdos de nuestro equipo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeria.map((foto) => (
              <div key={foto.id} className="card overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={foto.imagenUrl} 
                    alt={foto.titulo}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h3 className="text-lg font-semibold mb-2">{foto.titulo}</h3>
                      <p className="text-sm">{foto.descripcion}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {foto.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {foto.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactoWhatsapp />
    </div>
  );
};

export default QuienesSomos; 