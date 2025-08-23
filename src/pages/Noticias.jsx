import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- Importar Link
import { getPublishedNews, getNewsById } from '../services/newsService';
import { Calendar, Users, Trophy, Clock, ArrowRight, Loader } from 'lucide-react'; // <-- Importar ArrowRight
import ContactoWhatsapp from '../components/ContactoWhatsapp'; // <-- Importar componente

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const noticiasData = await getPublishedNews(); // <-- Usando el servicio
        setNoticias(noticiasData);
      } catch (error) {
        console.error('Error fetching noticias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getResultadoColor = (resultado) => {
    if (!resultado) return 'text-gray-600';
    if (resultado.includes('Victoria') || resultado.includes('Ganó')) return 'text-green-600';
    if (resultado.includes('Derrota') || resultado.includes('Perdió')) return 'text-red-600';
    return 'text-yellow-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-12 h-12 text-azulUnicen animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-azulUnicen to-azulOscuroUnicen text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Noticias y Partidos</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Toda la actualidad de la Escuela de Handball Unicen. ¡Sigue de cerca a nuestros equipos!
          </p>
        </div>
      </section>

      {/* Noticias Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {noticias.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No hay noticias disponibles
              </h2>
              <p className="text-gray-600">
                Pronto publicaremos las últimas novedades del equipo
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {noticias.map((noticia) => (
                <div key={noticia.id} className="card flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Imagen */}
                  <div className="h-52 bg-gray-200 flex items-center justify-center">
                    {noticia.imagenUrl ? (
                      <img 
                        src={noticia.imagenUrl} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <Trophy className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Handball Unicen</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {formatDate(noticia.fecha)}
                      </div>
                      {noticia.categoria && (
                        <span className="px-2.5 py-1 bg-celesteUnicen text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                          {noticia.categoria}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow">
                      {noticia.titulo}
                    </h3>
                    
                    {noticia.rival && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <Users className="w-4 h-4 mr-2" />
                        <span>vs {noticia.rival}</span>
                      </div>
                    )}
                    
                    {noticia.resultado && (
                      <div className="mb-4">
                        <span className={`font-bold text-lg ${getResultadoColor(noticia.resultado)}`}>
                          {noticia.resultado}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {noticia.resumen}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link to={`/noticias/${noticia.id}`} className="text-azulUnicen hover:text-azulOscuroUnicen font-semibold text-sm inline-flex items-center transition-colors duration-200">
                        Leer más
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactoWhatsapp />
    </div>
  );
};

export default Noticias; 