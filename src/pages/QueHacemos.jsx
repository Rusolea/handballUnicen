import { Calendar, Users, Trophy, Target, Clock, MapPin } from 'lucide-react';

const QueHacemos = () => {
  const actividades = [
    {
      icon: Target,
      title: 'Entrenamientos Regulares',
      description: 'Sesiones de entrenamiento técnico, táctico y físico',
      horarios: 'Lunes, Miércoles y Viernes de 18:00 a 20:00',
      lugar: 'Gimnasio Universitario'
    },
    {
      icon: Trophy,
      title: 'Competencias',
      description: 'Participación en torneos universitarios y locales',
      horarios: 'Fines de semana según calendario',
      lugar: 'Diferentes sedes'
    },
    {
      icon: Users,
      title: 'Clínicas Deportivas',
      description: 'Talleres especializados con entrenadores invitados',
      horarios: 'Sábados de 10:00 a 12:00',
      lugar: 'Gimnasio Universitario'
    },
    {
      icon: Calendar,
      title: 'Eventos Sociales',
      description: 'Actividades de integración y convivencia',
      horarios: 'Según programación',
      lugar: 'Campus Universitario'
    }
  ];

  const categorias = [
    {
      nombre: 'Categoría Sub-17',
      descripcion: 'Jugadores de 15 a 17 años',
      entrenador: 'Prof. Carlos Rodríguez',
      horarios: 'Lunes y Miércoles 18:00-20:00'
    },
    {
      nombre: 'Categoría Sub-20',
      descripcion: 'Jugadores de 18 a 20 años',
      entrenador: 'Prof. María González',
      horarios: 'Martes y Jueves 18:00-20:00'
    },
    {
      nombre: 'Categoría Libre',
      descripcion: 'Jugadores mayores de 20 años',
      entrenador: 'Prof. Juan Martínez',
      horarios: 'Viernes 18:00-20:00, Sábados 10:00-12:00'
    }
  ];

  const torneos = [
    {
      nombre: 'Torneo Universitario Regional',
      fecha: 'Marzo - Mayo 2024',
      ubicacion: 'Tandil, Buenos Aires',
      estado: 'En curso',
      descripcion: 'Competencia regional entre universidades'
    },
    {
      nombre: 'Liga Local de Handball',
      fecha: 'Abril - Agosto 2024',
      ubicacion: 'Tandil, Buenos Aires',
      estado: 'Próximo',
      descripcion: 'Liga local con equipos de la ciudad'
    },
    {
      nombre: 'Torneo Nacional Universitario',
      fecha: 'Septiembre - Noviembre 2024',
      ubicacion: 'Córdoba, Argentina',
      estado: 'Planificado',
      descripcion: 'Competencia nacional universitaria'
    }
  ];

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
              Nuestras Actividades
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un programa completo de desarrollo deportivo y personal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {actividades.map((actividad) => (
              <div key={actividad.title} className="card p-6">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-limaUnicen rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <actividad.icon className="w-8 h-8 text-white" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Categorías Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Categorías
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organizamos nuestros equipos por edades para un desarrollo óptimo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <div key={categoria.nombre} className="card p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {categoria.nombre}
                </h3>
                <p className="text-gray-600 mb-4">
                  {categoria.descripcion}
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-azulUnicen font-medium">
                    <strong>Entrenador:</strong> {categoria.entrenador}
                  </p>
                  <p className="text-gray-600">
                    <strong>Horarios:</strong> {categoria.horarios}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entrenamientos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestros Entrenamientos
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Desarrollamos un programa integral de entrenamiento que incluye:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Entrenamiento Técnico</h4>
                    <p className="text-gray-600">Mejora de habilidades específicas del handball</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Entrenamiento Táctico</h4>
                    <p className="text-gray-600">Estrategias de juego y posicionamiento</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Preparación Física</h4>
                    <p className="text-gray-600">Desarrollo de resistencia, fuerza y velocidad</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Psicología Deportiva</h4>
                    <p className="text-gray-600">Manejo de presión y trabajo en equipo</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-verdeUnicen to-limaUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Horarios de Entrenamiento</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Lunes</span>
                  <span>18:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Martes</span>
                  <span>18:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Miércoles</span>
                  <span>18:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Jueves</span>
                  <span>18:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Viernes</span>
                  <span>18:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sábado</span>
                  <span>10:00 - 12:00</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
                <p className="text-sm">
                  <strong>Ubicación:</strong> Gimnasio Universitario - Campus UNICEN
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Torneos Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Torneos y Competencias
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Participamos en diversas competencias a nivel regional y nacional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {torneos.map((torneo) => (
              <div key={torneo.nombre} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    torneo.estado === 'En curso' ? 'bg-green-100 text-green-800' :
                    torneo.estado === 'Próximo' ? 'bg-yellow-100 text-yellow-800' :
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
                  <p className="text-gray-500">
                    <strong>Fecha:</strong> {torneo.fecha}
                  </p>
                  <p className="text-gray-500">
                    <strong>Ubicación:</strong> {torneo.ubicacion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueHacemos; 