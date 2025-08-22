import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, Newspaper } from 'lucide-react';
import handballHero from '../assets/handball-hero-optimized.webp';
import { getQuickLinks, getPaginaHome } from '../services/homeService';
import { TailSpin } from 'react-loader-spinner';
import ContactoWhatsapp from '../components/ContactoWhatsapp'; // <-- Importar componente

const iconMap = {
  Calendar: Calendar,
  Users: Users,
  Trophy: Trophy,
  Newspaper: Newspaper,
};

const Home = () => {
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
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section
        className="relative text-white bg-top bg-cover"
        style={{ backgroundImage: `url(${handballHero})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{textos.heroTitulo}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {textos.heroSubtitulo}
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