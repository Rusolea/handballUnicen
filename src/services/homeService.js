// services/homeService.js
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
  writeBatch,
} from 'firebase/firestore';

// --- COLECCIONES ---
const QUICKLINKS_COLLECTION = 'home_quicklinks';
const PAGINAS_COLLECTION = 'paginas';

// --- SERVICIOS PARA ACCESOS RÁPIDOS ---

export const getQuickLinks = async () => {
  const q = query(collection(db, QUICKLINKS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createQuickLink = (data) => addDoc(collection(db, QUICKLINKS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateQuickLink = (id, data) => updateDoc(doc(db, QUICKLINKS_COLLECTION, id), data);
export const deleteQuickLink = (id) => deleteDoc(doc(db, QUICKLINKS_COLLECTION, id));

// --- SERVICIOS PARA TEXTOS DE LA PÁGINA ---

export const getPaginaHome = async () => {
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

export const updatePaginaHome = (data) => {
  const docRef = doc(db, PAGINAS_COLLECTION, 'home');
  return setDoc(docRef, data, { merge: true }); // Crea o actualiza
};

// --- FUNCIÓN DE SEEDING (CARGA INICIAL) ---

export const seedHomeData = async () => {
    const initialQuickLinks = [
        { title: 'Próximos Partidos', description: 'Mira el calendario de partidos y torneos', icon: 'Calendar', href: '/noticias', color: 'bg-azulUnicen', orden: 1 },
        { title: 'Nuestro Equipo', description: 'Conoce a los jugadores y entrenadores', icon: 'Users', href: '/quienes-somos', color: 'bg-verdeUnicen', orden: 2 },
        { title: 'Torneos', description: 'Información sobre competencias y logros', icon: 'Trophy', href: '/que-hacemos', color: 'bg-limaUnicen', orden: 3 },
        { title: 'Últimas Noticias', description: 'Mantente al día con las novedades del club', icon: 'Newspaper', href: '/noticias', color: 'bg-celesteUnicen', orden: 4 }
    ];

    const initialTextos = await getPaginaHome();

    try {
        const batch = writeBatch(db);
        let operationsCount = 0;

        const quickLinksSnapshot = await getDocs(query(collection(db, QUICKLINKS_COLLECTION)));
        if (quickLinksSnapshot.empty) {
            initialQuickLinks.forEach(item => {
                const docRef = doc(collection(db, QUICKLINKS_COLLECTION));
                batch.set(docRef, item);
                operationsCount++;
            });
        }

        const textosDocRef = doc(db, PAGINAS_COLLECTION, 'home');
        batch.set(textosDocRef, initialTextos, { merge: true });
        operationsCount++;

        if (operationsCount > 1) {
            await batch.commit();
            return { success: true, message: '¡Datos iniciales para el Home cargados!' };
        } else {
            return { success: false, message: 'Los datos iniciales del Home ya existen.' };
        }
    } catch (error) {
        console.error("Error al cargar datos iniciales del Home: ", error);
        return { success: false, message: `Error: ${error.message}` };
    }
};