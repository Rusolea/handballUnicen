// services/newsService.js

import { db } from './firebase'; // Firestore para los datos de las noticias
import { createClient } from '@supabase/supabase-js'; // Importamos el creador de clientes
import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import imageCompression from 'browser-image-compression'; // <-- ¡IMPORTA LA LIBRERÍA!

const NEWS_COLLECTION = 'noticias';

// --- CONFIGURACIÓN DE SUPABASE ---

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY; // <-- La clave secreta

// Cliente público: para leer datos (si fuera necesario) y obtener URLs públicas
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente de Admin: ¡SÓLO para operaciones de escritura (subir/borrar)!
// Este cliente usa la clave de servicio para saltarse las políticas de RLS.
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


// --- FUNCIONES DE STORAGE (USANDO EL CLIENTE CORRECTO) ---

export const uploadImage = async (file) => {
  if (!file) return null;

  // --- COMPRESIÓN DE LA IMAGEN ANTES DE SUBIR ---
  const options = {
    maxSizeMB: 1,          // Tamaño máximo del archivo en MB
    maxWidthOrHeight: 1920, // Redimensiona si es más grande
    useWebWorker: true,    // Usa un worker para no congelar la UI
    fileType: 'image/webp' // ¡Convierte a WebP!
  };

  try {
    console.log(`Tamaño original: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    
    const compressedFile = await imageCompression(file, options);
    
    console.log(`Tamaño comprimido: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
    
    const fileExt = 'webp'; // Forzamos la extensión a webp
    const fileNameBase = compressedFile.name.split('.').slice(0, -1).join('.');
    const sanitizedFileNameBase = fileNameBase.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]/g, '');
    const fileName = `${Date.now()}_${sanitizedFileNameBase}.${fileExt}`;
    const bucketName = 'imagenes-noticias';

    const { error } = await supabaseAdmin.storage
        .from(bucketName)
        .upload(fileName, compressedFile); // <-- ¡Subimos el archivo comprimido!
    
    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;

  } catch (error) {
    console.error('Error durante la compresión o subida de la imagen:', error);
    return null;
  }
};

export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const bucketName = 'imagenes-noticias';
    const fileName = imageUrl.split('/').pop();

    if (fileName) {
      // Usamos el cliente de ADMIN para borrar la imagen
      await supabaseAdmin.storage.from(bucketName).remove([fileName]);
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Supabase:', error);
  }
};


// --- FUNCIONES DE FIRESTORE (Estas se quedan igual) ---

export const createNews = async (noticiaData) => {
  const dataWithTimestamps = {
    ...noticiaData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  return addDoc(collection(db, NEWS_COLLECTION), dataWithTimestamps);
};

export const getAllNewsAdmin = async () => {
  const q = query(collection(db, NEWS_COLLECTION), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPublishedNews = async () => {
  const q = query(
    collection(db, NEWS_COLLECTION),
    where('status', '==', 'published'),
    orderBy('fecha', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getNewsById = async (id) => {
  const docRef = doc(db, NEWS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateNews = async (id, dataToUpdate) => {
  const docRef = doc(db, NEWS_COLLECTION, id);
  const dataWithTimestamp = {
    ...dataToUpdate,
    updatedAt: serverTimestamp(),
  };
  return updateDoc(docRef, dataWithTimestamp);
};

export const deleteNews = async (id) => {
  const noticiaToDelete = await getNewsById(id);
  if (noticiaToDelete?.imagenUrl) {
    await deleteImage(noticiaToDelete.imagenUrl); // <-- Esta función ahora usará el cliente de admin
  }
  const docRef = doc(db, NEWS_COLLECTION, id);
  return deleteDoc(docRef);
};