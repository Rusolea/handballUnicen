// services/queHacemosService.js
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
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

// --- COLECCIONES ---
const ACTIVIDADES_COLLECTION = 'queHacemos_actividades';
const CATEGORIAS_COLLECTION = 'queHacemos_categorias';
const TORNEOS_COLLECTION = 'queHacemos_torneos';
const PAGINAS_COLLECTION = 'paginas'; // Reutilizamos la colección de páginas

// --- SERVICIOS PARA ACTIVIDADES ---

export const getActividades = async () => {
  const q = query(collection(db, ACTIVIDADES_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createActividad = (data) => addDoc(collection(db, ACTIVIDADES_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateActividad = (id, data) => updateDoc(doc(db, ACTIVIDADES_COLLECTION, id), data);
export const deleteActividad = (id) => deleteDoc(doc(db, ACTIVIDADES_COLLECTION, id));


// --- SERVICIOS PARA CATEGORÍAS ---

export const getCategorias = async () => {
  const q = query(collection(db, CATEGORIAS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createCategoria = (data) => addDoc(collection(db, CATEGORIAS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateCategoria = (id, data) => updateDoc(doc(db, CATEGORIAS_COLLECTION, id), data);
export const deleteCategoria = (id) => deleteDoc(doc(db, CATEGORIAS_COLLECTION, id));


// --- SERVICIOS PARA TORNEOS ---

export const getTorneos = async () => {
  const q = query(collection(db, TORNEOS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createTorneo = (data) => addDoc(collection(db, TORNEOS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateTorneo = (id, data) => updateDoc(doc(db, TORNEOS_COLLECTION, id), data);
export const deleteTorneo = (id) => deleteDoc(doc(db, TORNEOS_COLLECTION, id));


// --- SERVICIOS PARA TEXTOS DE LA PÁGINA ---

export const getPaginaQueHacemos = async () => {
  const docRef = doc(db, PAGINAS_COLLECTION, 'queHacemos');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  // Devolver un objeto por defecto si el documento no existe
  return {
    tituloActividades: "Nuestras Actividades",
    subtituloActividades: "Un programa completo de desarrollo deportivo y personal",
    tituloCategorias: "Categorías",
    subtituloCategorias: "Organizamos nuestros equipos por edades para un desarrollo óptimo",
    tituloTorneos: "Torneos y Competencias",
    subtituloTorneos: "Participamos en diversas competencias a nivel local, regional y nacional",
    tituloEntrenamientos: "Nuestros Entrenamientos",
    descripcionEntrenamientos: "Desarrollamos un programa integral de entrenamiento que incluye:",
    puntosEntrenamiento: [
      "Entrenamiento Técnico",
      "Entrenamiento Táctico",
      "Preparación Física",
      "Formación Integral"
    ],
    tituloSedes: "Nuestras Sedes",
    sedes: [
      "SUM SABATO",
      "Instituto de Educación Física",
      "CCU (Centro Cultural Universitario)",
      "Campus Universitario"
    ]
  };
};

export const updatePaginaQueHacemos = (data) => {
  const docRef = doc(db, PAGINAS_COLLECTION, 'queHacemos');
  return setDoc(docRef, data, { merge: true }); // Crea o actualiza
};