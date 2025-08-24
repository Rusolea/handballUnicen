// services/quienesSomosService.js
import { getDbLite as getDb } from './firebaseLite';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
} from 'firebase/firestore/lite';

// --- COLECCIONES ---
const GALERIA_COLLECTION = 'galeriaQuienesSomos';
const CUERPO_TECNICO_COLLECTION = 'cuerpoTecnico';
const PAGINAS_COLLECTION = 'paginas';

// --- SERVICIOS PARA LA GALERÍA ---

export const getGaleria = async () => {
  const db = getDb();
  const q = query(collection(db, GALERIA_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// --- SERVICIOS PARA EL CUERPO TÉCNICO ---

export const getEntrenadores = async () => {
  const db = getDb();
  const q = query(collection(db, CUERPO_TECNICO_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// --- SERVICIOS PARA LOS TEXTOS DE LA PÁGINA ---

export const getPaginaQuienesSomos = async () => {
  const db = getDb();
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