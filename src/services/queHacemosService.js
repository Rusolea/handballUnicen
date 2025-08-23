// services/queHacemosService.js
import { getDb } from './firebase';
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
  writeBatch, // <-- 1. Importar writeBatch
} from 'firebase/firestore';

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

export const createActividad = (data) => addDoc(collection(getDb(), ACTIVIDADES_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateActividad = (id, data) => updateDoc(doc(getDb(), ACTIVIDADES_COLLECTION, id), data);
export const deleteActividad = (id) => deleteDoc(doc(getDb(), ACTIVIDADES_COLLECTION, id));


// --- SERVICIOS PARA CATEGORÍAS ---

export const getCategorias = async () => {
  const db = getDb();
  const q = query(collection(db, CATEGORIAS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createCategoria = (data) => addDoc(collection(getDb(), CATEGORIAS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateCategoria = (id, data) => updateDoc(doc(getDb(), CATEGORIAS_COLLECTION, id), data);
export const deleteCategoria = (id) => deleteDoc(doc(getDb(), CATEGORIAS_COLLECTION, id));


// --- SERVICIOS PARA TORNEOS ---

export const getTorneos = async () => {
  const db = getDb();
  const q = query(collection(db, TORNEOS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createTorneo = (data) => addDoc(collection(getDb(), TORNEOS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateTorneo = (id, data) => updateDoc(doc(getDb(), TORNEOS_COLLECTION, id), data);
export const deleteTorneo = (id) => deleteDoc(doc(getDb(), TORNEOS_COLLECTION, id));


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

export const updatePaginaQueHacemos = (data) => {
  const db = getDb();
  const docRef = doc(db, PAGINAS_COLLECTION, 'queHacemos');
  return setDoc(docRef, data, { merge: true }); // Crea o actualiza
};

// --- FUNCIÓN DE SEEDING (CARGA INICIAL) ---

export const seedQueHacemosData = async () => {
  const initialActividades = [
    { icon: 'Target', title: 'ENTRENAMIENTOS', description: 'Sesiones de entrenamiento técnico, táctico y físico', horarios: 'Ver sección por categorías más abajo', lugar: 'Múltiples sedes: SUM, Instituto de Ed. Física, CCU y Campus', orden: 1 },
    { icon: 'Trophy', title: 'COMPETENCIAS', description: 'Participación en Torneos Locales y Regionales', horarios: 'Fines de semana', lugar: 'Local y Visitante, según fixture', orden: 2 },
    { icon: 'Users', title: 'ENCUENTROS MASIVOS', description: 'Encuentros de Categorías Base', horarios: 'Fines de Semana', lugar: 'Multiples Sedes', orden: 3 },
    { icon: 'Calendar', title: 'CAMPUS INVIERNO', description: 'Campamento de Invierno: Entrenamiento + Charlas + Convivencia', horarios: 'Vacaciones Invierno', lugar: 'Campus Universitario', orden: 4 },
    { icon: 'Calendar', title: 'SALIDAS A LA NATURALEZA', description: 'Salidas y Actividades complementarias en la Naturaleza', horarios: 'Todo el Año', lugar: 'Tandil', orden: 5 }
  ];

  const initialCategorias = [
    { nombre: 'EFI', descripcion: 'Entrenamiento Formativo Inicial', entrenador: '', horarios: 'Lunes y Miércoles 19:00 a 20:00 (SUM SABATO)', orden: 1 },
    { nombre: 'Mini e Infantiles', descripcion: 'Niños/as en edad escolar', entrenador: '', horarios: 'Lunes y Miércoles 19:00 a 20:15, Sábados 10:30 a 12:00 (Inst. Ed. Física)', orden: 2 },
    { nombre: 'Menores Masculino', descripcion: 'Jugadores menores', entrenador: '', horarios: 'Lunes 16:00 a 17:30 (CCU), Jueves 17:00 a 19:00 y Viernes 16:00 a 17:30 (Campus)', orden: 3 },
    { nombre: 'Menores-Cadetes Femenino', descripcion: 'Jugadoras menores y cadetes', entrenador: '', horarios: 'Lunes y Miércoles 16:00 a 17:30 (CCU), Viernes 17:30 a 19:00 (Campus)', orden: 4 },
    { nombre: 'Cadetes - Juveniles Masculino', descripcion: 'Cadetes y juveniles varones', entrenador: '', horarios: 'Martes y Jueves 17:00 a 19:00, Viernes 16:00 a 17:30 (Campus)', orden: 5 },
    { nombre: 'Juveniles Femenino', descripcion: 'Jugadoras juveniles', entrenador: '', horarios: 'Lunes y Miércoles 20:15 a 21:45 (Inst. Ed. Física), Viernes 17:30 a 19:00 (Campus)', orden: 6 },
    { nombre: 'Mayores Femenino', descripcion: 'Jugadoras mayores', entrenador: '', horarios: 'Lunes y Miércoles 20:15 a 21:45 (Inst. Ed. Física)', orden: 7 },
    { nombre: 'Mayores Masculino', descripcion: 'Jugadores mayores', entrenador: '', horarios: 'Martes y Jueves 20:00 a 21:30 (Campus)', orden: 8 }
  ];

  const initialTorneos = [
    { nombre: 'ENCUENTRO MASIVO MINI-INFANTILES', fecha: 'Marzo - NOVIEMBRE 2025', ubicacion: 'Tandil - Rauch - Azul - B. Juarez Buenos Aires', estado: 'En curso', descripcion: 'Encuentros Formativos para Mini e Infantiles', orden: 1 },
    { nombre: 'APERTURA FORMATIVAS AS.CEN.BAL', fecha: 'Marzo - Julio 2025', ubicacion: 'Tandil - Rauch - Azul Buenos Aires', estado: 'Finalizado', descripcion: 'Liga As.Cen.Bal', orden: 2 },
    { nombre: 'APERTURA PROMOCIONAL AS.A.BAL', fecha: 'Marzo - Julio 2025', ubicacion: 'Liga Atlantica', estado: 'Finalizado', descripcion: 'Liga As.A.Bal Mayores Femenino y Masculino', orden: 3 },
    { nombre: 'SUPER 3 FEM Y MASC', fecha: 'Julio 2025', ubicacion: 'Tandil', estado: 'Finalizado', descripcion: 'Liga As.Cen.Bal', orden: 4 },
    { nombre: 'CLAUSURA FORMATIVAS AS.CEN.BAL', fecha: 'Agosto - Noviembre 2025', ubicacion: 'Tandil - Rauch - Azul Buenos Aires', estado: 'En curso', descripcion: 'Liga As.Cen.Bal', orden: 5 },
    { nombre: 'APERTURA PROMOCIONAL AS.A.BAL', fecha: 'Agosto - Noviembre 2025', ubicacion: 'Liga Atlantica', estado: 'En curso', descripcion: 'Liga As.A.Bal', orden: 6 },
    { nombre: 'COPA TANDIL', fecha: 'Octubre 2025', ubicacion: 'Tandil', estado: 'Proximamente', descripcion: 'Copa Tandil Formativas', orden: 7 }
  ];

  const initialTextos = await getPaginaQueHacemos(); // Usamos los textos por defecto del get

  try {
    const batch = writeBatch(getDb());
    let operationsCount = 0;

    const seedCollection = async (collectionName, initialData) => {
      const collectionRef = collection(getDb(), collectionName);
      const snapshot = await getDocs(query(collectionRef));
      if (snapshot.empty) {
        initialData.forEach(item => {
          const docRef = doc(collection(getDb(), collectionName));
          batch.set(docRef, item);
          operationsCount++;
        });
        return true;
      }
      return false;
    };

    await seedCollection(ACTIVIDADES_COLLECTION, initialActividades);
    await seedCollection(CATEGORIAS_COLLECTION, initialCategorias);
    await seedCollection(TORNEOS_COLLECTION, initialTorneos);

    const textosDocRef = doc(getDb(), PAGINAS_COLLECTION, 'queHacemos');
    batch.set(textosDocRef, initialTextos, { merge: true });
    operationsCount++;

    if (operationsCount > 1) { // >1 porque textos siempre se escribe
      await batch.commit();
      return { success: true, message: `¡Datos iniciales para "Qué Hacemos" cargados exitosamente!` };
    } else {
      return { success: false, message: 'Los datos iniciales ya existen. No se realizó ninguna acción.' };
    }

  } catch (error) {
    console.error("Error seeding data: ", error);
    return { success: false, message: `Error al cargar datos: ${error.message}` };
  }
};