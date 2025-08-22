import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Importar el Footer
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Lazy imports para todas las páginas
const Home = lazy(() => import('./pages/Home'));
const QuienesSomos = lazy(() => import('./pages/QuienesSomos'));
const QueHacemos = lazy(() => import('./pages/QueHacemos'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const Noticias = lazy(() => import('./pages/Noticias'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NuevaNoticia = lazy(() => import('./pages/NuevaNoticia'));
const EditarNoticia = lazy(() => import('./pages/EditarNoticia'));

// Nuevas páginas de administración para "Quiénes Somos"
const AdminGaleria = lazy(() => import('./pages/AdminGaleria'));
const AdminEntrenadores = lazy(() => import('./pages/AdminEntrenadores'));
const AdminTextoQuienesSomos = lazy(() => import('./pages/AdminTextoQuienesSomos'));

// Componente de loading
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azulUnicen mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/quienes-somos" element={<QuienesSomos />} />
                <Route path="/que-hacemos" element={<QueHacemos />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/noticias" element={<Noticias />} />
                
                {/* Rutas de administración */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/nueva-noticia" 
                  element={
                    <PrivateRoute>
                      <NuevaNoticia />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/editar-noticia/:id" 
                  element={
                    <PrivateRoute>
                      <EditarNoticia />
                    </PrivateRoute>
                  } 
                />
                {/* Nuevas rutas de administracion para Quienes Somos */}
                <Route 
                  path="/admin/galeria"
                  element={
                    <PrivateRoute>
                      <AdminGaleria />
                    </PrivateRoute>
                  }
                />
                 <Route 
                  path="/admin/entrenadores"
                  element={
                    <PrivateRoute>
                      <AdminEntrenadores />
                    </PrivateRoute>
                  }
                />
                 <Route 
                  path="/admin/textos-quienes-somos"
                  element={
                    <PrivateRoute>
                      <AdminTextoQuienesSomos />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
