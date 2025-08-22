// src/components/ContactoWhatsapp.jsx
import { Heart } from 'lucide-react';

const ContactoWhatsapp = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-azulUnicen to-verdeUnicen rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Agradecimiento y Contacto
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Agradecemos a todos los que apoyan y hacen posible el desarrollo de nuestro club. Su respaldo nos permite continuar formando deportistas de excelencia.
          </p>
          <div className="bg-gradient-to-br from-azulUnicen to-celesteUnicen rounded-lg p-8 text-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              ¿Te gustaría sumarte o saber más?
            </h3>
            <p className="text-lg mb-6">
              Si estás interesado en unirte a nuestros equipos, ser sponsor o simplemente quieres más información, ¡nos encantaría conversar contigo!
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
  );
};

export default ContactoWhatsapp;