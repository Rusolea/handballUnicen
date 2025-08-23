// src/services/adminService.js
import { getDb } from './firebase'; // <-- Importa la función
import { createClient } from '@supabase/supabase-js';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import imageCompression from 'browser-image-compression';

const NEWS_COLLECTION = 'noticias';

let supabase;
let supabaseAdmin;

const getSupabaseClients = () => {
  if (!supabase) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }
  return { supabase, supabaseAdmin };
}

// --- FUNCIONES DE STORAGE ---
export const uploadImage = async (file) => {
  if (!file) return null;
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp'
  };
  try {
    const compressedFile = await imageCompression(file, options);
    const fileExt = 'webp';
    const fileNameBase = compressedFile.name.split('.').slice(0, -1).join('.');
    const sanitizedFileNameBase = fileNameBase.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]/g, '');
    const fileName = `${Date.now()}_${sanitizedFileNameBase}.${fileExt}`;
    const bucketName = 'imagenes-noticias';
    const { supabase, supabaseAdmin } = getSupabaseClients();
    const { error } = await supabaseAdmin.storage.from(bucketName).upload(fileName, compressedFile);
    if (error) throw error;
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
    const bucketName = 'imagenes-noticias';
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
      const { supabaseAdmin } = getSupabaseClients();
      await supabaseAdmin.storage.from(bucketName).remove([fileName]);
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Supabase:', error);
  }
};

// --- FUNCIONES DE FIRESTORE PARA ADMIN ---
export const createNews = async (noticiaData) => {
  const db = getDb(); // <-- Llama a la función AQUÍ
  const dataWithTimestamps = { ...noticiaData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  return addDoc(collection(db, NEWS_COLLECTION), dataWithTimestamps);
};

export const getAllNewsAdmin = async () => {
  const q = query(collection(getDb(), NEWS_COLLECTION), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getNewsByIdForAdmin = async (id) => {
    const docRef = doc(getDb(), NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateNews = async (id, dataToUpdate) => {
  const docRef = doc(getDb(), NEWS_COLLECTION, id);
  const dataWithTimestamp = { ...dataToUpdate, updatedAt: serverTimestamp() };
  return updateDoc(docRef, dataWithTimestamp);
};

export const deleteNews = async (id) => {
  const noticiaToDelete = await getNewsByIdForAdmin(id);
  if (noticiaToDelete?.imagenUrl) {
    await deleteImage(noticiaToDelete.imagenUrl);
  }
  const docRef = doc(getDb(), NEWS_COLLECTION, id);
  return deleteDoc(docRef);
}; 