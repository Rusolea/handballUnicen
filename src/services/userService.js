import { getDb } from './firebase'; // <-- CAMBIO
import { doc, getDoc, setDoc } from 'firebase/firestore';

const USERS_COLLECTION = 'users';

/**
 * Asegura que un usuario tenga un perfil en Firestore.
 * Si no existe, lo crea con el rol 'viewer'.
 * @param {import('firebase/auth').User} firebaseUser El objeto de usuario de Firebase Auth.
 * @returns {Promise<object>} El perfil completo del usuario desde Firestore.
 */
export const ensureUserProfile = async (firebaseUser) => {
  const db = getDb(); // <-- CAMBIO
  if (!firebaseUser) return null;

  const userDocRef = doc(db, USERS_COLLECTION, firebaseUser.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    const newUserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role: 'user', // Rol por defecto
      createdAt: new Date(),
    };
    await setDoc(userDocRef, newUserProfile);
    return newUserProfile;
  }
};

/**
 * Obtiene el perfil de un usuario por su ID.
 * @param {string} uid El UID del usuario.
 * @returns {Promise<object|null>} El perfil del usuario o null si no existe.
 */
export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const db = getDb(); // <-- Add this line
  const userRef = doc(db, USERS_COLLECTION, uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};