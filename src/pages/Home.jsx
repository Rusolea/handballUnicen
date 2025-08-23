import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuickLinks, getPaginaHome } from '../services/homeService';
import { Loader, Calendar, Users, Trophy, Newspaper } from 'lucide-react';
import handballHero from '../assets/handball-hero-optimized.jpg';
import ContactoWhatsapp from '../components/ContactoWhatsapp';

const iconMap = {
  Calendar: Calendar,
  Users: Users,
  Trophy: Trophy,
  Newspaper: Newspaper,
};

const Home = () => {
  console.log('📄 [Page Load] Renderizando la página: Home');
  const [quickLinks, setQuickLinks] = useState([]);
  const [textos, setTextos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [linksData, textosData] = await Promise.all([
          getQuickLinks(),
          getPaginaHome(),
        ]);
        setQuickLinks(linksData);
        setTextos(textosData);
      } catch (err) {
        console.error("Error al cargar datos del Home:", err);
        setError("No se pudo cargar la página. Intente de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader className="w-12 h-12 text-azulUnicen animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  
  return (
    <div className="min-h-screen relative">
      {/* Hero Section - OPTIMIZED */}
      <section className="relative h-96 md:h-[500px] w-full text-white">
        {/* The image as a high-priority img tag */}
        <img
          src={handballHero}
          alt="Equipo de Handball Unicen en la cancha"
          width="1090"
          height="726"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Text and buttons container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ESCUELA DE HANDBALL UNICEN
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            FORMANDO DEPORTISTAS INTEGRALES EN LA UNICEN
          </p>
          {/* Aquí irían tus botones si los tuvieras */}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {textos.quickLinksTitulo}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {textos.quickLinksSubtitulo}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => {
              const IconComponent = iconMap[link.icon];
              return (
                <Link
                  key={link.id}
                  to={link.href}
                  className="card p-6 text-center hover:transform hover:scale-105 transition-transform duration-200 h-full flex flex-col justify-center"
                >
                  <div className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-600">
                    {link.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {textos.aboutTitulo}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {textos.aboutParrafo1}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {textos.aboutParrafo2}
              </p>
              <Link
                to="/quienes-somos"
                className="btn-primary"
              >
                Conoce Nuestra Historia
              </Link>
            </div>
            <div className="bg-gradient-to-br from-verdeUnicen to-azulUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{textos.valoresTitulo}</h3>
              <ul className="space-y-3">
                {textos.valoresLista?.map((valor, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    {valor}
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

export default Home; 