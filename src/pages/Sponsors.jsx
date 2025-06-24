import { ExternalLink, Building2, Heart } from 'lucide-react';

const Sponsors = () => {
  const sponsors = [
    {
      nombre: 'Universidad Nacional del Centro',
      logo: 'UNICEN',
      descripcion: 'Institución principal que respalda nuestro club deportivo',
      link: 'https://www.unicen.edu.ar',
      categoria: 'Principal'
    },
    {
      nombre: 'Municipalidad de Tandil',
      logo: 'TANDIL',
      descripcion: 'Apoyo municipal para el desarrollo deportivo local',
      link: 'https://www.tandil.gov.ar',
      categoria: 'Institucional'
    },
    {
      nombre: 'Deportes UNICEN',
      logo: 'DEPORTES',
      descripcion: 'Área de deportes de la universidad',
      link: '#',
      categoria: 'Institucional'
    },
    {
      nombre: 'Gimnasio Universitario',
      logo: 'GIMNASIO',
      descripcion: 'Instalaciones deportivas para entrenamientos',
      link: '#',
      categoria: 'Infraestructura'
    },
    {
      nombre: 'Liga Local de Handball',
      logo: 'LIGA',
      descripcion: 'Organización deportiva local',
      link: '#',
      categoria: 'Deportiva'
    },
    {
      nombre: 'Federación Argentina de Handball',
      logo: 'FAH',
      descripcion: 'Federación nacional del deporte',
      link: 'https://www.handballargentina.org',
      categoria: 'Deportiva'
    }
  ];

  const categorias = ['Principal', 'Institucional', 'Infraestructura', 'Deportiva'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-celesteUnicen to-azulUnicen text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nuestros Sponsors
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Instituciones y organizaciones que apoyan nuestro desarrollo deportivo
          </p>
        </div>
      </section>

      {/* Sponsors Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Instituciones que nos Apoyan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Agradecemos el respaldo de estas organizaciones que hacen posible nuestro crecimiento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor.nombre} className="card p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sponsor.categoria === 'Principal' ? 'bg-azulUnicen text-white' :
                    sponsor.categoria === 'Institucional' ? 'bg-verdeUnicen text-white' :
                    sponsor.categoria === 'Infraestructura' ? 'bg-limaUnicen text-white' :
                    'bg-celesteUnicen text-white'
                  }`}>
                    {sponsor.categoria}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {sponsor.nombre}
                </h3>
                <p className="text-gray-600 mb-4">
                  {sponsor.descripcion}
                </p>
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-azulUnicen hover:text-azulOscuroUnicen font-medium transition-colors duration-200"
                >
                  Visitar sitio web
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
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
              Tipos de Apoyo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diferentes formas en que nuestras instituciones nos respaldan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <div key={categoria} className="card p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  categoria === 'Principal' ? 'bg-azulUnicen' :
                  categoria === 'Institucional' ? 'bg-verdeUnicen' :
                  categoria === 'Infraestructura' ? 'bg-limaUnicen' :
                  'bg-celesteUnicen'
                }`}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {categoria}
                </h3>
                <p className="text-gray-600">
                  {categoria === 'Principal' && 'Apoyo institucional principal'}
                  {categoria === 'Institucional' && 'Respaldo de instituciones públicas'}
                  {categoria === 'Infraestructura' && 'Provisión de instalaciones'}
                  {categoria === 'Deportiva' && 'Organizaciones deportivas'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agradecimiento Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-azulUnicen to-verdeUnicen rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Agradecimiento Especial
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Queremos expresar nuestro más sincero agradecimiento a todas las instituciones 
              que nos apoyan y hacen posible el desarrollo de nuestro club. Su respaldo 
              nos permite continuar formando deportistas de excelencia y representando 
              con orgullo a nuestra universidad.
            </p>
            <div className="bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                ¿Te gustaría ser sponsor?
              </h3>
              <p className="text-lg mb-6">
                Si tu institución está interesada en apoyar nuestro club deportivo, 
                nos encantaría conversar contigo.
              </p>
              <button className="bg-white text-azulUnicen hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors; 