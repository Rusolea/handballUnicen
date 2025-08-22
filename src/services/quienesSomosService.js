// services/quienesSomosService.js
import { db } from './firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc, // <-- 1. Importar setDoc
} from 'firebase/firestore';
import { uploadImage, deleteImage } from './newsService'; // Reutilizamos las funciones de newsService

// --- COLECCIONES ---
const GALERIA_COLLECTION = 'galeriaQuienesSomos';
const CUERPO_TECNICO_COLLECTION = 'cuerpoTecnico';
const PAGINAS_COLLECTION = 'paginas';

// --- SERVICIOS PARA LA GALERÍA ---

export const getGaleria = async () => {
  const q = query(collection(db, GALERIA_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createGaleriaItem = async (data) => {
  return addDoc(collection(db, GALERIA_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateGaleriaItem = async (id, data) => {
  const docRef = doc(db, GALERIA_COLLECTION, id);
  return updateDoc(docRef, data);
};

export const deleteGaleriaItem = async (id, imageUrl) => {
  if (imageUrl) {
    await deleteImage(imageUrl);
  }
  const docRef = doc(db, GALERIA_COLLECTION, id);
  return deleteDoc(docRef);
};

// --- SERVICIOS PARA EL CUERPO TÉCNICO ---

export const getEntrenadores = async () => {
  const q = query(collection(db, CUERPO_TECNICO_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createEntrenador = async (data) => {
  return addDoc(collection(db, CUERPO_TECNICO_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateEntrenador = async (id, data) => {
  const docRef = doc(db, CUERPO_TECNICO_COLLECTION, id);
  return updateDoc(docRef, data);
};

export const deleteEntrenador = async (id, imageUrl) => {
  if (imageUrl && !imageUrl.includes('placeholder.com')) {
    await deleteImage(imageUrl);
  }
  const docRef = doc(db, CUERPO_TECNICO_COLLECTION, id);
  return deleteDoc(docRef);
};

// --- SERVICIOS PARA LOS TEXTOS DE LA PÁGINA ---

export const getPaginaQuienesSomos = async () => {
  const docRef = doc(db, PAGINAS_COLLECTION, 'quienesSomos');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // Podríamos devolver un objeto por defecto si el documento no existe
    console.log("No such document!");
    return {
        tituloHistoria: "Nuestra Historia",
        parrafoHistoria1: "La escuela de handball unicen nace...",
        parrafoHistoria2: "En ese año se dieron los primeros pasos...",
        tituloValores: "VALORES DE NUESTRA ESCUELA",
        subtituloValores: "Los principios que guían nuestro desarrollo..."
      };
  }
};

export const updatePaginaQuienesSomos = async (data) => {
  const docRef = doc(db, PAGINAS_COLLECTION, 'quienesSomos');
  // Usamos setDoc con la opción { merge: true }.
  // Esto crea el documento si no existe, y lo actualiza si ya existe.
  // Es la solución perfecta para este caso de "crear o actualizar".
  return setDoc(docRef, data, { merge: true }); // <-- 2. Cambiar updateDoc por setDoc
};