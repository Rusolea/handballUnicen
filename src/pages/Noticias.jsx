import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const q = query(collection(db, 'noticias'), orderBy('fecha', 'desc'));
        const querySnapshot = await getDocs(q);
        const noticiasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azulUnicen mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rojoUnicen to-azulUnicen text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Noticias y Partidos
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Mantente al día con las últimas novedades y resultados del equipo
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia) => (
                <div key={noticia.id} className="card overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  {/* Imagen */}
                  <div className="h-48 bg-gradient-to-br from-azulUnicen to-verdeUnicen flex items-center justify-center">
                    {noticia.imagenUrl ? (
                      <img 
                        src={noticia.imagenUrl} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-center">
                        <Trophy className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Sin imagen</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(noticia.fecha)}
                      </div>
                      {noticia.categoria && (
                        <span className="px-2 py-1 bg-azulUnicen text-white text-xs rounded-full">
                          {noticia.categoria}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {noticia.titulo}
                    </h3>
                    
                    {noticia.rival && (
                      <div className="flex items-center mb-3">
                        <Users className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">
                          vs {noticia.rival}
                        </span>
                      </div>
                    )}
                    
                    {noticia.resultado && (
                      <div className="mb-3">
                        <span className={`font-semibold ${getResultadoColor(noticia.resultado)}`}>
                          {noticia.resultado}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {noticia.resumen}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {noticia.fecha && formatDate(noticia.fecha)}
                      </div>
                      <button className="text-azulUnicen hover:text-azulOscuroUnicen font-medium text-sm transition-colors duration-200">
                        Leer más
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Estadísticas Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Estadísticas del Equipo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un resumen de nuestro rendimiento en la temporada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-azulUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15</h3>
              <p className="text-gray-600">Partidos Jugados</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-verdeUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">12</h3>
              <p className="text-gray-600">Victorias</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-rojoUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">2</h3>
              <p className="text-gray-600">Derrotas</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-limaUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1</h3>
              <p className="text-gray-600">Empates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Noticias; 