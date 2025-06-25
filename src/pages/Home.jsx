import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, Newspaper } from 'lucide-react';
import handballHero from '../assets/handball-hero-optimized.webp';

const Home = () => {
  const quickLinks = [
    {
      title: 'Próximos Partidos',
      description: 'Mira el calendario de partidos y torneos',
      icon: Calendar,
      href: '/noticias',
      color: 'bg-azulUnicen'
    },
    {
      title: 'Nuestro Equipo',
      description: 'Conoce a los jugadores y entrenadores',
      icon: Users,
      href: '/quienes-somos',
      color: 'bg-verdeUnicen'
    },
    {
      title: 'Torneos',
      description: 'Información sobre competencias y logros',
      icon: Trophy,
      href: '/que-hacemos',
      color: 'bg-limaUnicen'
    },
    {
      title: 'Últimas Noticias',
      description: 'Mantente al día con las novedades del club',
      icon: Newspaper,
      href: '/noticias',
      color: 'bg-celesteUnicen'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-white bg-top bg-cover"
        style={{ backgroundImage: `url(${handballHero})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Handball Unicen</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Formando deportistas de excelencia en la Universidad Nacional del Centro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quienes-somos"
              className="btn-primary text-lg px-8 py-3"
            >
              Conocenos
            </Link>
            <Link
              to="/noticias"
              className="bg-white text-azulUnicen hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Ver Noticias
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Accesos Rápidos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra rápidamente la información que necesitas sobre nuestro club
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="card p-6 text-center hover:transform hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <link.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {link.title}
                </h3>
                <p className="text-gray-600">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sobre Handball Unicen
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Somos el club de handball de la Universidad Nacional del Centro de la Provincia de Buenos Aires. 
                Nuestro objetivo es formar deportistas de excelencia, promoviendo valores como el trabajo en equipo, 
                la disciplina y la superación personal.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Participamos en torneos universitarios y locales, representando con orgullo a nuestra institución 
                y desarrollando el potencial deportivo de nuestros estudiantes.
              </p>
              <Link
                to="/quienes-somos"
                className="btn-primary"
              >
                Conoce Nuestra Historia
              </Link>
            </div>
            <div className="bg-gradient-to-br from-verdeUnicen to-azulUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Nuestros Valores</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Excelencia deportiva
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Trabajo en equipo
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Disciplina y compromiso
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Superación personal
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Representación institucional
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 