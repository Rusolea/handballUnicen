import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ensureUserProfile } from '../services/userService'; // <-- Importar

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // <-- Ahora guardará el perfil completo
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('👂 [AuthContext] onAuthStateChanged se disparó. Usuario:', user);
      if (user) {
        // Usuario ha iniciado sesión
        const userProfile = await ensureUserProfile(user); // <-- Asegurar perfil
        setCurrentUser(userProfile);
      } else {
        // Usuario ha cerrado sesión
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('🔄 [AuthContext] El estado currentUser ha cambiado:', currentUser);
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 