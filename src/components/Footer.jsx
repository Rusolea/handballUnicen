import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSponsors } from '../services/sponsorsService';
import logoHandballUnicen from '../assets/logohandballUnicen.png';


const Footer = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const sponsorsData = await getSponsors();
        // Limitar a 6 sponsors para el footer
        setSponsors(sponsorsData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching sponsors for footer:", error);
      }
    };

    fetchSponsors();
  }, []);

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Quiénes Somos', href: '/quienes-somos' },
    { name: 'Qué Hacemos', href: '/que-hacemos' },
    { name: 'Sponsors', href: '/sponsors' },
  ];

  return (
    <footer className="bg-azulOscuroUnicen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img src={logoHandballUnicen} alt="Handball Unicen" className="h-12 w-auto mr-3" />
              <span className="text-xl font-bold">Handball Unicen</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Formando deportistas integrales en la Universidad del Centro.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /><span>Tandil, Buenos Aires, Argentina</span></p>
              <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /><span>handball.unicen@gmail.com</span></p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /><span>+54 9 2494 24-4728</span></p>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-white transition-colors duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsors */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Nuestros Sponsors</h3>
            <div className="grid grid-cols-3 gap-4">
              {sponsors.map(sponsor => (
                <a 
                  key={sponsor.id} 
                  href={sponsor.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg flex items-center justify-center"
                >
                  <img src={sponsor.logoUrl} alt={sponsor.nombre} className="max-h-12 max-w-full object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Franja Inferior */}
      <div className="bg-black bg-opacity-20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Handball Unicen. Todos los derechos reservados.</p>
          <p>
            Creado por <a href="https://koven.inc" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">Koven Inc</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;