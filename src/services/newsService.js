import { db } from './firebase'; // Mantenemos Firestore
import { supabase } from './supabase'; // <-- Importamos Supabase
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const NEWS_COLLECTION = 'noticias';

// --- Funciones de Storage (AHORA CON SUPABASE) ---

/**
 * Sube una imagen a Supabase Storage, sanitizando el nombre del archivo primero.
 * @param {File} file El archivo de imagen a subir.
 * @returns {Promise<string|null>} La URL pública de la imagen o null si hay un error.
 */
export const uploadImage = async (file) => {
  if (!file) return null;

  try {
    // --- LÓGICA DE LIMPIEZA DEL NOMBRE DEL ARCHIVO ---
    
    // 1. Separa el nombre base de la extensión (ej. "mi-foto" y "png")
    const fileExt = file.name.split('.').pop();
    const fileNameBase = file.name.split('.').slice(0, -1).join('.');

    // 2. Limpia el nombre base:
    const sanitizedFileNameBase = fileNameBase
      .toLowerCase() // Pone todo en minúsculas
      .replace(/\s+/g, '_') // Reemplaza espacios con guiones bajos
      .replace(/[^\w-]/g, ''); // Elimina TODOS los caracteres que no sean letras, números, guiones bajos o guiones medios

    // 3. Crea el nuevo nombre de archivo final, único y seguro
    const fileName = `${Date.now()}_${sanitizedFileNameBase}.${fileExt}`;
    
    // --------------------------------------------------

    const bucketName = 'imagenes-noticias';

    // Sube el archivo con el nuevo nombre limpio
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) {
      // Si hay un error en la subida, lo lanzamos para que se capture en el bloque catch.
      throw error;
    }

    // Obtiene la URL pública del archivo recién subido
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;

  } catch (error) {
    console.error('Error al subir la imagen a Supabase:', error);
    // Es muy importante que el error se muestre en la consola para depurar.
    // La línea anterior ya lo hace.
    return null;
  }
};

/**
 * Elimina una imagen de Supabase Storage a partir de su URL.
 * @param {string} imageUrl La URL de la imagen a eliminar.
 */
export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const bucketName = 'imagenes-noticias';
    const fileName = imageUrl.split('/').pop(); // Extrae el nombre del archivo de la URL

    if (fileName) {
      await supabase.storage.from(bucketName).remove([fileName]);
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Supabase:', error);
  }
};


// --- Funciones de Firestore (CRUD) ---

/**
 * Crea una nueva noticia en Firestore.
 * @param {object} noticiaData Los datos de la noticia (sin incluir timestamps).
 * @returns {Promise<import('firebase/firestore').DocumentReference>}
 */
export const createNews = async (noticiaData) => {
  const dataWithTimestamps = {
    ...noticiaData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  return addDoc(collection(db, NEWS_COLLECTION), dataWithTimestamps);
};

/**
 * Obtiene todas las noticias para el panel de administración.
 * @returns {Promise<object[]>} Un array de noticias.
 */
export const getAllNewsAdmin = async () => {
  const q = query(collection(db, NEWS_COLLECTION), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Obtiene solo las noticias publicadas para la vista pública.
 * @returns {Promise<object[]>} Un array de noticias publicadas.
 */
export const getPublishedNews = async () => {
  const q = query(
    collection(db, NEWS_COLLECTION),
    where('status', '==', 'published'),
    orderBy('fecha', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Obtiene una noticia específica por su ID.
 * @param {string} id El ID del documento de la noticia.
 * @returns {Promise<object|null>} Los datos de la noticia o null si no se encuentra.
 */
export const getNewsById = async (id) => {
  const docRef = doc(db, NEWS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Actualiza una noticia existente en Firestore.
 * @param {string} id El ID de la noticia a actualizar.
 * @param {object} dataToUpdate Los campos a actualizar.
 * @returns {Promise<void>}
 */
export const updateNews = async (id, dataToUpdate) => {
  const docRef = doc(db, NEWS_COLLECTION, id);
  const dataWithTimestamp = {
    ...dataToUpdate,
    updatedAt: serverTimestamp(),
  };
  return updateDoc(docRef, dataWithTimestamp);
};

/**
 * Elimina una noticia de Firestore por su ID.
 * También intenta eliminar la imagen asociada de Storage.
 * @param {string} id El ID de la noticia a eliminar.
 * @returns {Promise<void>}
 */
export const deleteNews = async (id) => {
  const noticiaToDelete = await getNewsById(id);
  if (noticiaToDelete?.imagenUrl) {
    await deleteImage(noticiaToDelete.imagenUrl);
  }
  const docRef = doc(db, NEWS_COLLECTION, id);
  return deleteDoc(docRef);
};