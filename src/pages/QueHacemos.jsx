import { Calendar, Users, Trophy, Target, Clock, MapPin } from 'lucide-react';

const QueHacemos = () => {
  const actividades = [
    {
      icon: Target,
      title: 'ENTRENAMIENTOS',
      description: 'Sesiones de entrenamiento técnico, táctico y físico',
      horarios: 'Ver sección por categorías más abajo',
      lugar: 'Múltiples sedes: SUM, Instituto de Ed. Física, CCU y Campus'
    },
    {
      icon: Trophy,
      title: 'COMPETENCIAS',
      description: 'Participación en Torneos Locales y Regionales',
      horarios: 'Fines de semana',
      lugar: 'Local y Visitante, según fixture'
    },
    {
      icon: Users,
      title: 'ENCUENTROS MASIVOS',
      description: 'Encuentros de Categorías Base',
      horarios: 'Fines de Semana',
      lugar: 'Multiples Sedes'
    },
    {
      icon: Calendar,
      title: 'CAMPUS INVIERNO',
      description: 'Campamento de Invierno: Entrenamiento + Charlas + Convivencia',
      horarios: 'Vacaciones Invierno',
      lugar: 'Campus Universitario'
    },
    {
      icon: Calendar,
      title: 'SALIDAS A LA NATURALEZA',
      description: 'Salidas y Actividades complementarias en la Naturaleza',
      horarios: 'Todo el Año',
      lugar: 'Tandil'
    }
  ];

  const categorias = [
    {
      nombre: 'EFI',
      descripcion: 'Entrenamiento Formativo Inicial',
      entrenador: '',
      horarios: 'Lunes y Miércoles 19:00 a 20:00 (SUM SABATO)'
    },
    {
      nombre: 'Mini e Infantiles',
      descripcion: 'Niños/as en edad escolar',
      entrenador: '',
      horarios: 'Lunes y Miércoles 19:00 a 20:15, Sábados 10:30 a 12:00 (Inst. Ed. Física)'
    },
    {
      nombre: 'Menores Masculino',
      descripcion: 'Jugadores menores',
      entrenador: '',
      horarios: 'Lunes 16:00 a 17:30 (CCU), Jueves 17:00 a 19:00 y Viernes 16:00 a 17:30 (Campus)'
    },
    {
      nombre: 'Menores-Cadetes Femenino',
      descripcion: 'Jugadoras menores y cadetes',
      entrenador: '',
      horarios: 'Lunes y Miércoles 16:00 a 17:30 (CCU), Viernes 17:30 a 19:00 (Campus)'
    },
    {
      nombre: 'Cadetes - Juveniles Masculino',
      descripcion: 'Cadetes y juveniles varones',
      entrenador: '',
      horarios: 'Martes y Jueves 17:00 a 19:00, Viernes 16:00 a 17:30 (Campus)'
    },
    {
      nombre: 'Juveniles Femenino',
      descripcion: 'Jugadoras juveniles',
      entrenador: '',
      horarios: 'Lunes y Miércoles 20:15 a 21:45 (Inst. Ed. Física), Viernes 17:30 a 19:00 (Campus)'
    },
    {
      nombre: 'Mayores Femenino',
      descripcion: 'Jugadoras mayores',
      entrenador: '',
      horarios: 'Lunes y Miércoles 20:15 a 21:45 (Inst. Ed. Física)'
    },
    {
      nombre: 'Mayores Masculino',
      descripcion: 'Jugadores mayores',
      entrenador: '',
      horarios: 'Martes y Jueves 20:00 a 21:30 (Campus)'
    }
  ];

  const torneos = [
    {
      nombre: 'ENCUENTRO MASIVO MINI-INFANTILES',
      fecha: 'Marzo - NOVIEMBRE 2025',
      ubicacion: 'Tandil - Rauch - Azul - B. Juarez Buenos Aires',
      estado: 'En curso',
      descripcion: 'Encuentros Formativos para Mini e Infantiles'
    },
    {
      nombre: 'APERTURA FORMATIVAS AS.CEN.BAL',
      fecha: 'Marzo - Julio 2025',
      ubicacion: 'Tandil - Rauch - Azul Buenos Aires',
      estado: 'Finalizado',
      descripcion: 'Liga As.Cen.Bal'
    },
    {
      nombre: 'APERTURA PROMOCIONAL AS.A.BAL',
      fecha: 'Marzo - Julio 2025',
      ubicacion: 'Liga Atlantica',
      estado: 'Finalizado',
      descripcion: 'Liga As.A.Bal Mayores Femenino y Masculino'
    },
    {
      nombre: 'SUPER 3 FEM Y MASC',
      fecha: 'Julio 2025',
      ubicacion: 'Tandil',
      estado: 'Finalizado',
      descripcion: 'Liga As.Cen.Bal'
    },
    {
      nombre: 'CLAUSURA FORMATIVAS AS.CEN.BAL',
      fecha: 'Agosto - Noviembre 2025',
      ubicacion: 'Tandil - Rauch - Azul Buenos Aires',
      estado: 'En curso',
      descripcion: 'Liga As.Cen.Bal'
    },
    {
      nombre: 'APERTURA PROMOCIONAL AS.A.BAL',
      fecha: 'Agosto - Noviembre 2025',
      ubicacion: 'Liga Atlantica',
      estado: 'En curso',
      descripcion: 'Liga As.A.Bal'
    },
    {
      nombre: 'COPA TANDIL',
      fecha: 'Octubre 2025',
      ubicacion: 'Tandil',
      estado: 'Proximamente',
      descripcion: 'Copa Tandil Formativas'
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <div key={categoria.nombre} className="card p-6">
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
              Torneos y Competencias
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Participamos en diversas competencias a nivel local, regional y nacional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {torneos.map((torneo) => (
              <div key={torneo.nombre} className="card p-6">
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
                    {/* <p className="text-gray-600">Mejora de habilidades específicas del handball</p> */}
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Entrenamiento Táctico</h4>
                    {/* <p className="text-gray-600">Estrategias de juego y posicionamiento</p> */}
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Preparación Física</h4>
                    {/* <p className="text-gray-600">Desarrollo de resistencia, fuerza y velocidad</p> */}
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-azulUnicen rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Formación Integral</h4>
                    {/* <p className="text-gray-600">Valores deportivos y trabajo en equipo</p> */}
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-verdeUnicen to-azulUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Nuestras Sedes</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  SUM SABATO
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Instituto de Educación Física
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  CCU (Centro Cultural Universitario)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Campus Universitario
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueHacemos; 