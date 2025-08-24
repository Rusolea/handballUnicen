// services/homeService.js
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
const QUICKLINKS_COLLECTION = 'home_quicklinks';
const PAGINAS_COLLECTION = 'paginas';
const NEWS_COLLECTION = 'noticias';

// --- SERVICIOS PARA ACCESOS RÁPIDOS ---

export const getQuickLinks = async () => {
  const db = getDb();
  const q = query(collection(db, QUICKLINKS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// --- SERVICIOS PARA TEXTOS DE LA PÁGINA ---

export const getPaginaHome = async () => {
  const db = getDb();
  const docRef = doc(db, PAGINAS_COLLECTION, 'home');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  // Devolver un objeto por defecto si el documento no existe
  return {
    heroTitulo: "ESCUELA DE HANDBALL UNICEN",
    heroSubtitulo: "FORMANDO DEPORTISTAS INTEGRALES EN LA UNIVERSIDAD DEL CENTRO",
    quickLinksTitulo: "Accesos Rápidos",
    quickLinksSubtitulo: "Encuentra rápidamente la información que necesitas sobre nuestro club",
    aboutTitulo: "Sobre Handball Unicen",
    aboutParrafo1: "Somos el club de handball de la Universidad Nacional del Centro de la Provincia de Buenos Aires. Nuestro objetivo es formar deportistas de excelencia, promoviendo valores como el trabajo en equipo, la disciplina y la superación personal.",
    aboutParrafo2: "Participamos en torneos universitarios y locales, representando con orgullo a nuestra institución y desarrollando el potencial deportivo de nuestros estudiantes.",
    valoresTitulo: "Nuestros Valores",
    valoresLista: [
      "Excelencia deportiva",
      "Trabajo en equipo",
      "Disciplina y compromiso",
      "Superación personal",
      "Representación institucional"
    ]
  };
};

export const getDashboardStats = async () => {
  const db = getDb();
  const noticiasQuery = query(collection(db, NEWS_COLLECTION));
  const querySnapshot = await getDocs(noticiasQuery);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};