// services/sponsorsService.js
import { getDbLite as getDb } from './firebaseLite';
import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore/lite';

const SPONSORS_COLLECTION = 'sponsors';

export const getSponsors = async () => {
  const db = getDb();
  const q = query(collection(db, SPONSORS_COLLECTION), orderBy('orden', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};