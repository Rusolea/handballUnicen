// services/queHacemosService.js
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
const ACTIVIDADES_COLLECTION = 'queHacemos_actividades';
const CATEGORIAS_COLLECTION = 'queHacemos_categorias';
const TORNEOS_COLLECTION = 'queHacemos_torneos';
const PAGINAS_COLLECTION = 'paginas'; // Reutilizamos la colección de páginas

// --- SERVICIOS PARA ACTIVIDADES ---

export const getActividades = async () => {
  const db = getDb();
  const q = query(collection(db, ACTIVIDADES_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// --- SERVICIOS PARA CATEGORÍAS ---

export const getCategorias = async () => {
  const db = getDb();
  const q = query(collection(db, CATEGORIAS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// --- SERVICIOS PARA TORNEOS ---

export const getTorneos = async () => {
  const db = getDb();
  const q = query(collection(db, TORNEOS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// --- SERVICIOS PARA TEXTOS DE LA PÁGINA ---

export const getPaginaQueHacemos = async () => {
  const db = getDb();
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