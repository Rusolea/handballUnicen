import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getSponsors } from '../services/sponsorsService';
import { TailSpin } from 'react-loader-spinner';

const Sponsors = () => {
  const [sponsorsList, setSponsorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const data = await getSponsors();
        setSponsorsList(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar los sponsors:", err);
        setError("No se pudieron cargar los sponsors. Por favor, intente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-celesteUnicen to-azulUnicen text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nuestros Sponsors
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            EMPRESAS, MARCAS Y EMPRENDIMIENTOS QUE NOS APOYAN EN NUESTRO DESARROLLO DEPORTIVO
          </p>
        </div>
      </section>

      {/* Sponsors Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
            {sponsorsList.map((sponsor) => (
              <a 
                key={sponsor.id}
                href={sponsor.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-40"
              >
                <img 
                  src={sponsor.logoUrl} 
                  alt={sponsor.nombre}
                  className="max-h-24 max-w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Agradecimiento Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-azulUnicen to-verdeUnicen rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Agradecimiento Especial
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Queremos expresar nuestro más sincero agradecimiento a todas las empresas, marcas y emprendimientos que nos apoyan y hacen posible el desarrollo de nuestro club. Su respaldo nos permite continuar formando deportistas de excelencia.
            </p>
            <div className="bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                ¿Te gustaría ser sponsor?
              </h3>
              <p className="text-lg mb-6">
                Si tu empresa o emprendimiento está interesado en apoyar nuestro club deportivo, nos encantaría conversar contigo.
              </p>
              <a
                href="https://wa.me/5492494244728"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-azulUnicen hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors; 