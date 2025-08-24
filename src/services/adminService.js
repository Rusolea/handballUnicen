// src/services/adminService.js
import { getDb } from './firebase';
import { getSupabase, getSupabaseAdmin } from './supabase';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  writeBatch
} from 'firebase/firestore';
import imageCompression from 'browser-image-compression';

// --- CONSTANTES DE COLECCIONES ---
const NEWS_COLLECTION = 'noticias';
const SPONSORS_COLLECTION = 'sponsors';
const GALERIA_COLLECTION = 'galeriaQuienesSomos';
const CUERPO_TECNICO_COLLECTION = 'cuerpoTecnico';
const PAGINAS_COLLECTION = 'paginas';
const ACTIVIDADES_COLLECTION = 'queHacemos_actividades';
const CATEGORIAS_COLLECTION = 'queHacemos_categorias';
const TORNEOS_COLLECTION = 'queHacemos_torneos';
const QUICKLINKS_COLLECTION = 'home_quicklinks';


// --- FUNCIONES DE STORAGE (MANEJO DE IMÁGENES) ---

export const uploadImage = async (file, options = {}) => {
  if (!file) return null;
  const preset = options.preset || 'default';
  const compressionOptions = preset === 'logo'
    ? {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 300,
        initialQuality: 0.6,
        useWebWorker: true,
        fileType: 'image/webp'
      }
    : {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp'
      };
  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    const fileExt = 'webp';
    const fileNameBase = compressedFile.name.split('.').slice(0, -1).join('.');
    const sanitizedFileNameBase = fileNameBase.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]/g, '');
    const fileName = `${Date.now()}_${sanitizedFileNameBase}.${fileExt}`;
    const bucketName = 'imagenes-noticias'; // Considerar si se necesitan buckets diferentes
    
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.storage.from(bucketName).upload(fileName, compressedFile);
    if (error) throw error;
    
    const supabase = getSupabase();
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error durante la compresión o subida de la imagen:', error);
    return null;
  }
};

export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;
  try {
    const bucketName = 'imagenes-noticias'; // Asegurarse que el bucket sea el correcto
    const fileName = imageUrl.split('/').pop();
    if (fileName && !fileName.includes('placeholder.com')) {
        const supabaseAdmin = getSupabaseAdmin();
        await supabaseAdmin.storage.from(bucketName).remove([fileName]);
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Supabase:', error);
  }
};


// --- FUNCIONES DE NOTICIAS ---

export const createNews = async (noticiaData) => {
  const db = getDb();
  const dataWithTimestamps = { ...noticiaData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  return addDoc(collection(db, NEWS_COLLECTION), dataWithTimestamps);
};

export const getAllNewsAdmin = async () => {
  const db = getDb();
  const q = query(collection(db, NEWS_COLLECTION), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getNewsByIdForAdmin = async (id) => {
    const db = getDb();
    const docRef = doc(db, NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateNews = async (id, dataToUpdate) => {
  const db = getDb();
  const docRef = doc(db, NEWS_COLLECTION, id);
  const dataWithTimestamp = { ...dataToUpdate, updatedAt: serverTimestamp() };
  return updateDoc(docRef, dataWithTimestamp);
};

export const deleteNews = async (id) => {
  const db = getDb();
  const noticiaToDelete = await getNewsByIdForAdmin(id);
  if (noticiaToDelete?.imagenUrl) {
    await deleteImage(noticiaToDelete.imagenUrl);
  }
  const docRef = doc(db, NEWS_COLLECTION, id);
  return deleteDoc(docRef);
};


// --- FUNCIONES DE SPONSORS ---

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
    await deleteImage(logoUrl);
  }
  const docRef = doc(db, SPONSORS_COLLECTION, id);
  return deleteDoc(docRef);
};


// --- FUNCIONES DE QUIENES SOMOS ---

// Galeria
export const createGaleriaItem = (data) => addDoc(collection(getDb(), GALERIA_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateGaleriaItem = (id, data) => updateDoc(doc(getDb(), GALERIA_COLLECTION, id), data);
export const deleteGaleriaItem = async (id, imageUrl) => {
  if (imageUrl) {
    await deleteImage(imageUrl);
  }
  return deleteDoc(doc(getDb(), GALERIA_COLLECTION, id));
};

// Cuerpo Técnico
export const createEntrenador = (data) => addDoc(collection(getDb(), CUERPO_TECNICO_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateEntrenador = (id, data) => updateDoc(doc(getDb(), CUERPO_TECNICO_COLLECTION, id), data);
export const deleteEntrenador = async (id, imageUrl) => {
  if (imageUrl) {
    await deleteImage(imageUrl);
  }
  return deleteDoc(doc(getDb(), CUERPO_TECNICO_COLLECTION, id));
};

// Texto Página
export const updatePaginaQuienesSomos = (data) => {
  const docRef = doc(getDb(), PAGINAS_COLLECTION, 'quienesSomos');
  return setDoc(docRef, data, { merge: true });
};


// --- FUNCIONES DE QUÉ HACEMOS ---

// Actividades
export const createActividad = (data) => addDoc(collection(getDb(), ACTIVIDADES_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateActividad = (id, data) => updateDoc(doc(getDb(), ACTIVIDADES_COLLECTION, id), data);
export const deleteActividad = (id) => deleteDoc(doc(getDb(), ACTIVIDADES_COLLECTION, id));

// Categorías
export const createCategoria = (data) => addDoc(collection(getDb(), CATEGORIAS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateCategoria = (id, data) => updateDoc(doc(getDb(), CATEGORIAS_COLLECTION, id), data);
export const deleteCategoria = (id) => deleteDoc(doc(getDb(), CATEGORIAS_COLLECTION, id));

// Torneos
export const createTorneo = (data) => addDoc(collection(getDb(), TORNEOS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateTorneo = (id, data) => updateDoc(doc(getDb(), TORNEOS_COLLECTION, id), data);
export const deleteTorneo = (id) => deleteDoc(doc(getDb(), TORNEOS_COLLECTION, id));

// Texto Página
export const updatePaginaQueHacemos = (data) => {
  const docRef = doc(getDb(), PAGINAS_COLLECTION, 'queHacemos');
  return setDoc(docRef, data, { merge: true });
};


// --- FUNCIONES DE HOME ---

// Quick Links
export const createQuickLink = (data) => addDoc(collection(getDb(), QUICKLINKS_COLLECTION), { ...data, createdAt: serverTimestamp() });
export const updateQuickLink = (id, data) => updateDoc(doc(getDb(), QUICKLINKS_COLLECTION, id), data);
export const deleteQuickLink = (id) => deleteDoc(doc(getDb(), QUICKLINKS_COLLECTION, id));

// Texto Página
export const updatePaginaHome = (data) => {
  const docRef = doc(getDb(), PAGINAS_COLLECTION, 'home');
  return setDoc(docRef, data, { merge: true });
};

// --- FUNCIONES DE SEEDING ---

export const seedHomeData = async () => {
    const initialQuickLinks = [
        { title: 'Próximos Partidos', description: 'Mira el calendario de partidos y torneos', icon: 'Calendar', href: '/noticias', color: 'bg-azulUnicen', orden: 1 },
        { title: 'Nuestro Equipo', description: 'Conoce a los jugadores y entrenadores', icon: 'Users', href: '/quienes-somos', color: 'bg-verdeUnicen', orden: 2 },
        { title: 'Torneos', description: 'Información sobre competencias y logros', icon: 'Trophy', href: '/que-hacemos', color: 'bg-limaUnicen', orden: 3 },
        { title: 'Últimas Noticias', description: 'Mantente al día con las novedades del club', icon: 'Newspaper', href: '/noticias', color: 'bg-celesteUnicen', orden: 4 }
    ];
    
    const db = getDb();
    const paginasDocRef = doc(db, PAGINAS_COLLECTION, 'home');
    const paginasDocSnap = await getDoc(paginasDocRef);
    const initialTextos = paginasDocSnap.exists() 
        ? paginasDocSnap.data() 
        : {
            heroTitulo: "ESCUELA DE HANDBALL UNICEN",
            heroSubtitulo: "FORMANDO DEPORTISTAS INTEGRALES EN LA UNIVERSIDAD DEL CENTRO",
            quickLinksTitulo: "Accesos Rápidos",
            quickLinksSubtitulo: "Encuentra rápidamente la información que necesitas sobre nuestro club",
            aboutTitulo: "Sobre Handball Unicen",
            aboutParrafo1: "Somos el club de handball de la Universidad Nacional del Centro de la Provincia de Buenos Aires. Nuestro objetivo es formar deportistas de excelencia, promoviendo valores como el trabajo en equipo, la disciplina y la superación personal.",
            aboutParrafo2: "Participamos en torneos universitarios y locales, representando con orgullo a nuestra institución y desarrollando el potencial deportivo de nuestros estudiantes.",
            valoresTitulo: "Nuestros Valores",
            valoresLista: [ "Excelencia deportiva", "Trabajo en equipo", "Disciplina y compromiso", "Superación personal", "Representación institucional" ]
        };

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
    
    const db = getDb();
    const paginasDocRef = doc(db, PAGINAS_COLLECTION, 'queHacemos');
    const paginasDocSnap = await getDoc(paginasDocRef);
    const initialTextos = paginasDocSnap.exists() 
        ? paginasDocSnap.data()
        : {
            tituloActividades: "Nuestras Actividades",
            subtituloActividades: "Un programa completo de desarrollo deportivo y personal",
            tituloCategorias: "Categorías",
            subtituloCategorias: "Organizamos nuestros equipos por edades para un desarrollo óptimo",
            tituloTorneos: "Torneos y Competencias",
            subtituloTorneos: "Participamos en diversas competencias a nivel local, regional y nacional",
            tituloEntrenamientos: "Nuestros Entrenamientos",
            descripcionEntrenamientos: "Desarrollamos un programa integral de entrenamiento que incluye:",
            puntosEntrenamiento: [ "Entrenamiento Técnico", "Entrenamiento Táctico", "Preparación Física", "Formación Integral" ],
            tituloSedes: "Nuestras Sedes",
            sedes: [ "SUM SABATO", "Instituto de Educación Física", "CCU (Centro Cultural Universitario)", "Campus Universitario" ]
        };

    try {
        const batch = writeBatch(db);
        let operationsCount = 0;

        const seedCollection = async (collectionName, initialData) => {
            const collectionRef = collection(db, collectionName);
            const snapshot = await getDocs(query(collectionRef));
            if (snapshot.empty) {
                initialData.forEach(item => {
                    const docRef = doc(collection(db, collectionName));
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

        const textosDocRef = doc(db, PAGINAS_COLLECTION, 'queHacemos');
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