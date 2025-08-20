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
      title: 'ACTITUD',
      // description: 'Buscamos la excelencia en cada entrenamiento y competencia'
    },
    {
      icon: Users,
      title: 'AMOR',
      // description: 'Valoramos la colaboración y el espíritu de equipo'
    },
    {
      icon: Award,
      title: 'RESPETO',
      // description: 'Mantenemos la disciplina y el compromiso en todo momento'
    },
    // {
    //   icon: Heart,
    //   title: 'Pasión',
    //   description: 'Jugamos con pasión y amor por el deporte'
    // }
  ];

  const entrenadores = [
    {
      nombre: 'Prof. Santiago Villalba',
      roles: ['Coordinador Deportivo Gral.', 'Profesor', 'Director Técnico']
    },
    {
      nombre: 'Prof. Alfonsina Moreno',
      roles: ['Coordinadora Deportiva Base', 'Profesora', 'Directora Técnica']
    },
    {
      nombre: 'Prof. Octavio Patron',
      roles: ['Coordinador Deportivo', 'Profesor', 'Director Técnico/Asistente Técnico']
    },
    {
      nombre: 'Prof. Juan Jose Gonzalez',
      roles: ['Profesor', 'Director Técnico/Asistente Tecnico']
    },
    {
      nombre: 'Prof. Melina Del Rio',
      roles: ['Profesora', 'EFI/Asistente Técnica']
    },
    {
      nombre: 'David Lopez',
      roles: ['Profesor', 'Asistente Técnico']
    },
    {
      nombre: 'Prof. Walter Lavin',
      roles: ['Profesor', 'Director Técnico']
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
      // descripcion: 'Sesión de entrenamiento técnico y táctico'
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nuestra Historia
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-left">
            La escuela de handball unicen nace en el año 2018 comenzando asi con la formación de chicos y chicas en el Balonmano Formativo dentro de la Universidad del Centro de la Prov. de Bs As. 
          </p>
          <p className="text-lg text-gray-600 mb-6 text-left">
            En ese año se dieron los primeros pasos con grupos de Mini e Infantiles y año a año se fueron sumando mas categorias. Hoy en dia sigue el crecimiento exponencial brindando una formación integral y de calidad a mas de 140 chicos y chicas a partir de los 6 años, formando y compitiendo a nivel local y regional.
          </p>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
            VALORES DE NUESTRA ESCUELA
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro desarrollo deportivo y personal
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
              <div key={entrenador.nombre} className="card p-6 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-verdeUnicen to-azulUnicen rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-white" />
                </div>
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