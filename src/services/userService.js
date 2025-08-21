import { db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const USERS_COLLECTION = 'users';

/**
 * Asegura que un usuario tenga un perfil en Firestore.
 * Si no existe, lo crea con el rol 'viewer'.
 * @param {import('firebase/auth').User} firebaseUser El objeto de usuario de Firebase Auth.
 * @returns {Promise<object>} El perfil completo del usuario desde Firestore.
 */
export const ensureUserProfile = async (firebaseUser) => {
  if (!firebaseUser) return null;

  const userRef = doc(db, USERS_COLLECTION, firebaseUser.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // El usuario no tiene un perfil, lo creamos
    const { displayName, email, photoURL, uid } = firebaseUser;
    await setDoc(userRef, {
      uid,
      displayName,
      email,
      photoURL,
      role: 'viewer', // Rol por defecto
      createdAt: serverTimestamp(),
    });
  }

  // Devolvemos el perfil fresco desde la base de datos
  const freshDoc = await getDoc(userRef);
  return { id: freshDoc.id, ...freshDoc.data() };
};

/**
 * Obtiene el perfil de un usuario por su ID.
 * @param {string} uid El UID del usuario.
 * @returns {Promise<object|null>} El perfil del usuario o null si no existe.
 */
export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const userRef = doc(db, USERS_COLLECTION, uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};