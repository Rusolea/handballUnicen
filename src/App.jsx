import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import QueHacemos from './pages/QueHacemos';
import Sponsors from './pages/Sponsors';
import Noticias from './pages/Noticias';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NuevaNoticia from './pages/NuevaNoticia';
import EditarNoticia from './pages/EditarNoticia';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
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
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
