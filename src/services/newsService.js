// services/newsService.js - Versión Pública
import { db } from './firebase';
import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore';

const NEWS_COLLECTION = 'noticias';

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
  const noticia = docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  
  // Asegurarse de que solo se devuelvan noticias publicadas
  if (noticia && noticia.status !== 'published') {
    return null;
  }
  return noticia;
};