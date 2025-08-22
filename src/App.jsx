import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Importar el Footer
import AuthProvider from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoadingSpinner from './components/LoadingSpinner'; // <-- Import the new component

// Lazy imports para todas las páginas
const Home = lazy(() => import('./pages/Home'));
const QuienesSomos = lazy(() => import('./pages/QuienesSomos'));
const QueHacemos = lazy(() => import('./pages/QueHacemos'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const Noticias = lazy(() => import('./pages/Noticias'));
const NoticiaDetalle = lazy(() => import('./pages/NoticiaDetalle')); // <-- Import the new component
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NuevaNoticia = lazy(() => import('./pages/NuevaNoticia'));
const EditarNoticia = lazy(() => import('./pages/EditarNoticia'));

// Nuevas páginas de administración para "Quiénes Somos"
const AdminGaleria = lazy(() => import('./pages/AdminGaleria'));
const AdminEntrenadores = lazy(() => import('./pages/AdminEntrenadores'));
const AdminTextoQuienesSomos = lazy(() => import('./pages/AdminTextoQuienesSomos'));

// Nuevas páginas de administración para "Qué Hacemos"
const AdminActividades = lazy(() => import('./pages/AdminActividades'));
const AdminCategorias = lazy(() => import('./pages/AdminCategorias'));
const AdminTorneos = lazy(() => import('./pages/AdminTorneos'));
const AdminTextoQueHacemos = lazy(() => import('./pages/AdminTextoQueHacemos'));

// Nueva página de administración para "Sponsors"
const AdminSponsors = lazy(() => import('./pages/AdminSponsors'));

// Nuevas páginas de administración para "Home"
const AdminQuickLinks = lazy(() => import('./pages/AdminQuickLinks'));
const AdminTextoHome = lazy(() => import('./pages/AdminTextoHome'));

// El componente de loading se ha movido a su propio archivo

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
                <Route path="/noticias/:id" element={<NoticiaDetalle />} /> {/* <-- Add the new route */}
                
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
                {/* Nuevas rutas de administracion para Que Hacemos */}
                 <Route 
                  path="/admin/actividades"
                  element={
                    <PrivateRoute>
                      <AdminActividades />
                    </PrivateRoute>
                  }
                />
                 <Route 
                  path="/admin/categorias"
                  element={
                    <PrivateRoute>
                      <AdminCategorias />
                    </PrivateRoute>
                  }
                />
                 <Route 
                  path="/admin/torneos"
                  element={
                    <PrivateRoute>
                      <AdminTorneos />
                    </PrivateRoute>
                  }
                />
                 <Route 
                  path="/admin/textos-que-hacemos"
                  element={
                    <PrivateRoute>
                      <AdminTextoQueHacemos />
                    </PrivateRoute>
                  }
                />
                {/* Nueva ruta de administracion para Sponsors */}
                <Route 
                  path="/admin/sponsors"
                  element={
                    <PrivateRoute>
                      <AdminSponsors />
                    </PrivateRoute>
                  }
                />
                 {/* Nueva ruta de administracion para Home */}
                <Route 
                  path="/admin/quick-links"
                  element={
                    <PrivateRoute>
                      <AdminQuickLinks />
                    </PrivateRoute>
                  }
                />
                 <Route 
                  path="/admin/textos-home"
                  element={
                    <PrivateRoute>
                      <AdminTextoHome />
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
