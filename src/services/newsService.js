import { db, storage } from './firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const NEWS_COLLECTION = 'noticias';

// --- Funciones de Storage ---

/**
 * Sube una imagen a Firebase Storage.
 * @param {File} file El archivo de imagen a subir.
 * @returns {Promise<string|null>} La URL de descarga de la imagen o null si no hay archivo.
 */
export const uploadImage = async (file) => {
  if (!file) return null;
  
  const storageRef = ref(storage, `${NEWS_COLLECTION}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};

/**
 * Elimina una imagen de Firebase Storage a partir de su URL.
 * @param {string} imageUrl La URL de la imagen a eliminar.
 * @returns {Promise<void>}
 */
export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    // Si la imagen no existe, Firebase lanza un error 'storage/object-not-found'.
    // Podemos ignorarlo de forma segura si no nos importa que el archivo ya no exista.
    if (error.code !== 'storage/object-not-found') {
      console.error("Error al eliminar la imagen de Storage:", error);
      throw error; // Volver a lanzar errores que no sean "no encontrado"
    }
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