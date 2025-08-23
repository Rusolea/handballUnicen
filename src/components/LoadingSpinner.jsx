import LogoUnicen from '../assets/logohandballUnicen.svg?react';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LogoUnicen 
        className="h-20 w-auto mx-auto mb-6 animate-pulse text-azulOscuroUnicen"
        aria-label="Cargando..."
      />
      <p className="text-lg text-gray-700 font-semibold">Cargando...</p>
    </div>
  </div>
);

export default LoadingSpinner; 