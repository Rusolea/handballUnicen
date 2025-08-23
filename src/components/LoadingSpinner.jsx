import logoHandballUnicen from '../assets/logohandballUnicen.png';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <img 
        src={logoHandballUnicen} 
        alt="Cargando..." 
        className="h-20 w-auto mx-auto mb-6 animate-pulse"
      />
      <p className="text-lg text-gray-700 font-semibold">Cargando...</p>
    </div>
  </div>
);

export default LoadingSpinner; 