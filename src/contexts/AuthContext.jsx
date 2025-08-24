// contexts/AuthContext.jsx

import { useState, useEffect } from 'react';
import { getDb } from '../services/firebase';
import { getAuthInstance } from '../services/firebaseAuth';
import { doc, getDoc } from 'firebase/firestore';

// Import the context from our new hook file
import { AuthContext } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner'; // <-- Importar el spinner

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const auth = getAuthInstance();
    const db = getDb();
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    if (firebaseUser) {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: userDocSnap.data().role,
        };
        setCurrentUser(userProfile);
        return userProfile;
      } else {
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
        throw new Error('Usuario no autorizado.');
      }
    }
  };

  const logout = () => {
    const auth = getAuthInstance();
    setCurrentUser(null);
    return import('firebase/auth').then(({ signOut }) => signOut(auth));
  };

  useEffect(() => {
    const auth = getAuthInstance();
    const db = getDb();
    let unsubscribe = () => {};
    import('firebase/auth').then(({ onAuthStateChanged, signOut }) => {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setCurrentUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: userDocSnap.data().role,
            });
          } else {
            // If user exists in Auth but not in Firestore, log them out.
            setCurrentUser(null);
            await signOut(auth);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
    isAdmin: currentUser?.role === 'admin'
  };

  // Si está cargando el estado de auth, muestra el spinner en toda la página
  if (loading) {
    return <LoadingSpinner />;
  }

  // Una vez cargado, renderiza la aplicación
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 