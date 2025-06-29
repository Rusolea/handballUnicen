import { Users, Award, Target, Heart } from 'lucide-react';
import handballEquipo2 from '../assets/handball_equipo2.webp';
import handballMini from '../assets/handball_mini.webp';
import equipoHandball from '../assets/equipo_handball.webp';
import equipoJugando from '../assets/equipojUgando.jpg';
import handballHero from '../assets/handball-hero-optimized.webp';

const QuienesSomos = () => {
  const valores = [
    {
      icon: Target,
      title: 'Excelencia',
      description: 'Buscamos la excelencia en cada entrenamiento y competencia'
    },
    {
      icon: Users,
      title: 'Trabajo en Equipo',
      description: 'Valoramos la colaboración y el espíritu de equipo'
    },
    {
      icon: Award,
      title: 'Disciplina',
      description: 'Mantenemos la disciplina y el compromiso en todo momento'
    },
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Jugamos con pasión y amor por el deporte'
    }
  ];

  const entrenadores = [
    {
      nombre: 'Prof. Santiago Villalva',
      cargo: 'Entrenador Principal',
      especialidad: 'Técnica y táctica',
      experiencia: '15 años de experiencia en handball universitario'
    },
    {
      nombre: 'Prof. Octavio Patron',
      cargo: 'Entrenadora Asistente',
      especialidad: 'Preparación física',
      experiencia: 'Especialista en desarrollo atlético juvenil'
    },
    {
      nombre: 'Prof. Alfonsina Moreno',
      cargo: 'Coordinador Deportivo',
      especialidad: 'Gestión deportiva',
      experiencia: 'Coordinadora de deportes universitarios'
    }
  ];

  const galeriaFotos = [
    {
      imagen: handballEquipo2,
      titulo: 'Equipo Principal',
      descripcion: 'Nuestro equipo principal en acción durante un partido'
    },
    {
      imagen: handballMini,
      titulo: 'Categoría Mini',
      descripcion: 'Los más pequeños del club disfrutando del handball'
    },
    {
      imagen: equipoHandball,
      titulo: 'Entrenamiento',
      descripcion: 'Sesión de entrenamiento técnico y táctico'
    },
    {
      imagen: equipoJugando,
      titulo: 'En Competencia',
      descripcion: 'Momentos de intensidad en torneos universitarios'
    },
    {
      imagen: handballHero,
      titulo: 'Espíritu de Equipo',
      descripcion: 'La pasión y dedicación que nos caracteriza'
    }
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Handball Unicen nació en el año 2010 como una iniciativa de estudiantes 
                apasionados por el handball que buscaban representar a la Universidad 
                Nacional del Centro en competencias deportivas.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Desde nuestros inicios, hemos crecido de manera constante, formando 
                equipos competitivos que han logrado destacarse en torneos universitarios 
                regionales y nacionales.
              </p>
              <p className="text-lg text-gray-600">
                Hoy somos una referencia en el handball universitario de la provincia 
                de Buenos Aires, formando no solo excelentes deportistas, sino también 
                personas comprometidas con valores como el trabajo en equipo, la disciplina 
                y la superación personal.
              </p>
            </div>
            <div className="bg-gradient-to-br from-azulUnicen to-azulOscuroUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Logros Destacados</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Campeones Regionales 2023</h4>
                    <p className="text-sm opacity-90">Torneo Universitario Regional</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Subcampeones Nacionales 2022</h4>
                    <p className="text-sm opacity-90">Torneo Nacional Universitario</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Premio al Fair Play 2021</h4>
                    <p className="text-sm opacity-90">Reconocimiento deportivo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro desarrollo deportivo y personal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor) => (
              <div key={valor.title} className="card p-6 text-center">
                <div className="w-16 h-16 bg-azulUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                  <valor.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {valor.title}
                </h3>
                <p className="text-gray-600">
                  {valor.description}
                </p>
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
              <div key={entrenador.nombre} className="card p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-verdeUnicen to-azulUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {entrenador.nombre}
                </h3>
                <p className="text-azulUnicen font-medium mb-2">
                  {entrenador.cargo}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Especialidad:</strong> {entrenador.especialidad}
                </p>
                <p className="text-gray-600 text-sm">
                  {entrenador.experiencia}
                </p>
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
            {galeriaFotos.map((foto, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={foto.imagen} 
                    alt={foto.titulo}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-semibold mb-2">{foto.titulo}</h3>
                      <p className="text-sm">{foto.descripcion}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
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
    </div>
  );
};

export default QuienesSomos; 