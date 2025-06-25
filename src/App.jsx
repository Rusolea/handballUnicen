import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
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
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
