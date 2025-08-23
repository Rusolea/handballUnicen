// services/sponsorsService.js
import { db } from './firebase';
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
  const q = query(collection(db, SPONSORS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createSponsor = async (data) => {
  return addDoc(collection(db, SPONSORS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateSponsor = async (id, data) => {
  const docRef = doc(db, SPONSORS_COLLECTION, id);
  return updateDoc(docRef, data);
};

export const deleteSponsor = async (id, logoUrl) => {
  if (logoUrl) {
    // Solo intentamos borrar si la URL no es un placeholder
    if (!logoUrl.includes('placeholder.com')) {
      await deleteImage(logoUrl);
    }
  }
  const docRef = doc(db, SPONSORS_COLLECTION, id);
  return deleteDoc(docRef);
};