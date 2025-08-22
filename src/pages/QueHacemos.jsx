import { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, Target, Clock, MapPin } from 'lucide-react';
import { getActividades, getCategorias, getTorneos, getPaginaQueHacemos } from '../services/queHacemosService';
import { TailSpin } from 'react-loader-spinner';
import ContactoWhatsapp from '../components/ContactoWhatsapp'; // <-- Importar componente

// Mapeo de strings a componentes de íconos para renderizar dinámicamente
const iconMap = {
  Target: Target,
  Trophy: Trophy,
  Users: Users,
  Calendar: Calendar,
};

const QueHacemos = () => {
  const [actividades, setActividades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [torneos, setTorneos] = useState([]);
  const [textos, setTextos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          actividadesData,
          categoriasData,
          torneosData,
          textosData
        ] = await Promise.all([
          getActividades(),
          getCategorias(),
          getTorneos(),
          getPaginaQueHacemos()
        ]);
        setActividades(actividadesData);
        setCategorias(categoriasData);
        setTorneos(torneosData);
        setTextos(textosData);
        setError(null);
      } catch (err) {
        console.error("Error al cargar datos de 'Qué Hacemos':", err);
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
      <section className="bg-gradient-to-br from-limaUnicen to-verdeUnicen text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Qué Hacemos
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Descubre nuestras actividades, categorías y competencias
          </p>
        </div>
      </section>

      {/* Actividades Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {textos.tituloActividades}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {textos.subtituloActividades}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {actividades.map((actividad) => {
              const IconComponent = iconMap[actividad.icon];
              return (
                <div key={actividad.id} className="card p-6">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-limaUnicen rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {actividad.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {actividad.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          {actividad.horarios}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          {actividad.lugar}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categorías Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {textos.tituloCategorias}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {textos.subtituloCategorias}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <div key={categoria.id} className="card p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {categoria.nombre}
                </h3>
                <p className="text-gray-600 mb-4 text-sm text-center">
                  {categoria.descripcion}
                </p>
                <div className="space-y-2 text-sm">
                  {categoria.entrenador && (
                    <p className="text-azulUnicen font-medium">
                      <strong>Entrenador:</strong> {categoria.entrenador}
                    </p>
                  )}
                  <p className="text-gray-600">
                    <strong>Horarios:</strong> {categoria.horarios}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Torneos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {textos.tituloTorneos}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {textos.subtituloTorneos}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {torneos.map((torneo) => (
              <div key={torneo.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-verdeUnicen to-limaUnicen rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    torneo.estado === 'En curso' ? 'bg-green-100 text-green-800' :
                    torneo.estado === 'Próximo' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {torneo.estado}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {torneo.nombre}
                </h3>
                <p className="text-gray-600 mb-4">
                  {torneo.descripcion}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {torneo.fecha}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {torneo.ubicacion}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {textos.tituloEntrenamientos}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {textos.descripcionEntrenamientos}
              </p>
              <ul className="space-y-4">
                {textos.puntosEntrenamiento?.map((punto, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{punto}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-verdeUnicen to-azulUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{textos.tituloSedes}</h3>
              <ul className="space-y-3">
                 {textos.sedes?.map((sede, index) => (
                    <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                        {sede}
                    </li>
                 ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactoWhatsapp />
    </div>
  );
};

export default QueHacemos; 