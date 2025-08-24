// services/newsService.js - Versión Pública
import { getDbLite as getDb } from './firebaseLite';
import { collection, getDocs, query, where, orderBy, doc, getDoc, limit, startAfter } from 'firebase/firestore/lite';

const NEWS_COLLECTION = 'noticias';

export const getPublishedNews = async () => {
  const db = getDb();
  const q = query(
    collection(db, NEWS_COLLECTION),
    where('status', '==', 'published'),
    orderBy('fecha', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getNewsById = async (id) => {
  const db = getDb();
  const docRef = doc(db, NEWS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  const noticia = docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  
  // Asegurarse de que solo se devuelvan noticias publicadas
  if (noticia && noticia.status !== 'published') {
    return null;
  }
  return noticia;
};

// Paginación: devuelve una página de noticias publicadas y un cursor para la siguiente
export const getPublishedNewsPage = async ({ pageSize = 6, cursor = null } = {}) => {
  const db = getDb();
  let q = query(
    collection(db, NEWS_COLLECTION),
    where('status', '==', 'published'),
    orderBy('fecha', 'desc'),
    limit(pageSize)
  );
  if (cursor) {
    q = query(
      collection(db, NEWS_COLLECTION),
      where('status', '==', 'published'),
      orderBy('fecha', 'desc'),
      startAfter(cursor),
      limit(pageSize)
    );
  }

  const snapshot = await getDocs(q);
  const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  const nextCursor = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
  const hasMore = snapshot.docs.length === pageSize;
  return { items, nextCursor, hasMore };
};