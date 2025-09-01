import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../services/newsService';
import { Calendar, ArrowLeft, Users, Trophy } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const NoticiaDetalle = () => {
  console.log('📄 [Page Load] Renderizando la página: NoticiaDetalle');
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNoticia = async () => {
      try {
        setLoading(true);
        const data = await getNewsById(id);
        if (data) {
          setNoticia(data);
        } else {
          setError('La noticia que buscas no fue encontrada.');
        }
      } catch (err) {
        setError('Ocurrió un error al cargar la noticia.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticia();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return 'Fecha no disponible';
    const d = date.toDate ? date.toDate() : new Date(date);
    if (isNaN(d.getTime())) {
        return 'Fecha inválida';
    }
    return d.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Detecta si un string contiene HTML para elegir cómo renderizarlo
  const isHTML = (s) => typeof s === 'string' && /<\/?[a-z][\s\S]*>/i.test(s);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
        <Link to="/noticias" className="btn-primary mt-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Noticias
        </Link>
      </div>
    );
  }

  if (!noticia) {
    return null; 
  }

  return (
    <div className="bg-white">
      {/* Hero Image */}
      {noticia.imagenUrl && (
        <div className="h-64 md:h-96 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${noticia.imagenUrl})` }}></div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/noticias" className="text-azulUnicen hover:text-azulOscuroUnicen font-semibold text-sm inline-flex items-center transition-colors duration-200 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a todas las noticias
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{noticia.titulo}</h1>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Publicado el {formatDate(noticia.fecha)}</span>
          </div>
        </div>

        {/* --- CONTENIDO DE LA NOTICIA --- */}
        <div className="prose prose-lg max-w-none text-gray-800">
          {/* 1. Resumen: sin negrita y con saltos de línea */}
          {noticia.resumen && (
            <p className="whitespace-pre-line">{noticia.resumen}</p>
          )}

          {noticia.rival && (
            <div className="flex items-center text-gray-600 my-4 not-prose">
              <Users className="w-5 h-5 mr-2" />
              <span>vs {noticia.rival}</span>
            </div>
          )}
          
          {noticia.resultado && (
            <div className="flex items-center text-gray-600 my-4 not-prose">
              <Trophy className="w-5 h-5 mr-2" />
              <span>Resultado: {noticia.resultado}</span>
            </div>
          )}
          
          {/* 2. Contenido Principal: respeta HTML o saltos de línea si es texto plano */}
          {noticia.contenido && (
            isHTML(noticia.contenido)
              // Si es HTML, se renderiza con "dangerouslySetInnerHTML"
              ? <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: noticia.contenido }} />
              // Si es texto plano, se divide por párrafos y se respetan saltos internos
              : noticia.contenido.split(/\r?\n\r?\n/).map((p, i) => (
                  <p key={i} className="whitespace-pre-line">{p}</p>
                ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticiaDetalle; 