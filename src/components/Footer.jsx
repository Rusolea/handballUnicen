import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Youtube } from 'lucide-react'; // 1. Importar nuevos íconos
import { useState, useEffect } from 'react';
import { getSponsors } from '../services/sponsorsService';
import logoUnicenUrl from '../assets/logohandballUnicen.svg'; // Importar como URL


const Footer = () => {
  console.log('⬇️ [Footer] Renderizando (carga perezosa)...');
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const sponsorsData = await getSponsors();
        setSponsors(sponsorsData);
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
              <img 
                src={logoUnicenUrl} 
                alt="Logo Handball Unicen" 
                className="h-12 w-12 mr-3"
                width="48"
                height="48"
              />
              <span className="text-xl font-bold">Handball Unicen</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Formando deportistas integrales en la Universidad del Centro.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /><span>Tandil, Buenos Aires, Argentina</span></p>
              <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /><span>handballunicen@gmail.com</span></p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /><span>+54 9 2494 24-4728</span></p>
            </div>
            {/* 2. Añadir sección de redes sociales */}
            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-2">Seguinos</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/handballunicen/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Handball Unicen"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@HandballUnicen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Canal de YouTube de Handball Unicen"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
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
            
            {/* Container with overflow hidden */}
            <div className="relative w-full overflow-hidden h-20">
              
              {/* Animated scrolling strip */}
              <div className="flex animate-scroll">
                
                {sponsors.map(sponsor => (
                  <a 
                    key={sponsor.id} 
                    href={sponsor.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-32 h-16 mx-4 bg-white p-2 rounded-lg flex items-center justify-center"
                  >
                    <img 
                      src={sponsor.logoUrl} 
                      alt={sponsor.nombre} 
                      className="max-h-12 w-auto object-contain"
                      loading="lazy"
                      width="100"
                      height="50"
                    />
                  </a>
                ))}

                {sponsors.map(sponsor => (
                  <a 
                    key={`${sponsor.id}-duplicate`} 
                    href={sponsor.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-32 h-16 mx-4 bg-white p-2 rounded-lg flex items-center justify-center"
                    aria-hidden="true"
                    tabIndex="-1"
                  >
                    <img 
                      src={sponsor.logoUrl} 
                      alt={sponsor.nombre} 
                      className="max-h-12 w-auto object-contain"
                      loading="lazy"
                      width="100"
                      height="50"
                    />
                  </a>
                ))}
                
              </div>
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