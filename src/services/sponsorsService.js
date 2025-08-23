// services/sponsorsService.js
import { getDb } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
// Importamos las funciones de manejo de imágenes desde el nuevo adminService
import { deleteImage } from './adminService';

const SPONSORS_COLLECTION = 'sponsors';

export const getSponsors = async () => {
  const db = getDb();
  const q = query(collection(db, SPONSORS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createSponsor = async (data) => {
  const db = getDb();
  return addDoc(collection(db, SPONSORS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateSponsor = async (id, data) => {
  const db = getDb();
  const docRef = doc(db, SPONSORS_COLLECTION, id);
  return updateDoc(docRef, data);
};

export const deleteSponsor = async (id, logoUrl) => {
  const db = getDb();
  if (logoUrl) {
    // Solo intentamos borrar si la URL no es un placeholder
    if (!logoUrl.includes('placeholder.com')) {
      await deleteImage(logoUrl);
    }
  }
  const docRef = doc(db, SPONSORS_COLLECTION, id);
  return deleteDoc(docRef);
};