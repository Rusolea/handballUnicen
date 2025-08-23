import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoadingSpinner from './components/LoadingSpinner';

// --- Carga Perezosa de Componentes y Páginas ---
const Home = lazy(() => import('./pages/Home'));
const QuienesSomos = lazy(() => import('./pages/QuienesSomos'));
const QueHacemos = lazy(() => import('./pages/QueHacemos'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const Noticias = lazy(() => import('./pages/Noticias'));
const NoticiaDetalle = lazy(() => import('./pages/NoticiaDetalle'));
const Footer = lazy(() => import('./components/Footer'));

// --- Carga Perezosa de Rutas de Admin ---
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NuevaNoticia = lazy(() => import('./pages/NuevaNoticia'));
const EditarNoticia = lazy(() => import('./pages/EditarNoticia'));
const AdminGaleria = lazy(() => import('./pages/AdminGaleria'));
const AdminEntrenadores = lazy(() => import('./pages/AdminEntrenadores'));
const AdminTextoQuienesSomos = lazy(() => import('./pages/AdminTextoQuienesSomos'));
const AdminActividades = lazy(() => import('./pages/AdminActividades'));
const AdminCategorias = lazy(() => import('./pages/AdminCategorias'));
const AdminTorneos = lazy(() => import('./pages/AdminTorneos'));
const AdminTextoQueHacemos = lazy(() => import('./pages/AdminTextoQueHacemos'));
const AdminSponsors = lazy(() => import('./pages/AdminSponsors'));
const AdminQuickLinks = lazy(() => import('./pages/AdminQuickLinks'));
const AdminTextoHome = lazy(() => import('./pages/AdminTextoHome'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));

function App() {
  return (
    // AuthProvider ya NO envuelve toda la aplicación
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* --- RUTAS PÚBLICAS --- */}
              <Route path="/" element={<Home />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/que-hacemos" element={<QueHacemos />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/noticias/:id" element={<NoticiaDetalle />} />
              <Route path="/admin" element={<AdminLogin />} />

              {/* --- RUTAS DE ADMINISTRACIÓN (AGRUPADAS) --- */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route 
                  path="dashboard" 
                  element={<PrivateRoute><AdminDashboard /></PrivateRoute>} 
                />
                <Route 
                  path="nueva-noticia" 
                  element={<PrivateRoute><NuevaNoticia /></PrivateRoute>} 
                />
                <Route 
                  path="editar-noticia/:id" 
                  element={<PrivateRoute><EditarNoticia /></PrivateRoute>} 
                />
                {/* ... (añadir aquí TODAS las otras rutas de admin) ... */}
                <Route path="galeria" element={<PrivateRoute><AdminGaleria /></PrivateRoute>} />
                <Route path="entrenadores" element={<PrivateRoute><AdminEntrenadores /></PrivateRoute>} />
                <Route path="textos-quienes-somos" element={<PrivateRoute><AdminTextoQuienesSomos /></PrivateRoute>} />
                <Route path="actividades" element={<PrivateRoute><AdminActividades /></PrivateRoute>} />
                <Route path="categorias" element={<PrivateRoute><AdminCategorias /></PrivateRoute>} />
                <Route path="torneos" element={<PrivateRoute><AdminTorneos /></PrivateRoute>} />
                <Route path="textos-que-hacemos" element={<PrivateRoute><AdminTextoQueHacemos /></PrivateRoute>} />
                <Route path="sponsors" element={<PrivateRoute><AdminSponsors /></PrivateRoute>} />
                <Route path="quick-links" element={<PrivateRoute><AdminQuickLinks /></PrivateRoute>} />
                <Route path="textos-home" element={<PrivateRoute><AdminTextoHome /></PrivateRoute>} />
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
