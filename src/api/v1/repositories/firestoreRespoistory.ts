import { db } from "../../../../config/firebaseConfig";

export const addDocument = async (collection: string, data: any) => {
  const docRef = await db.collection(collection).add(data);
  return docRef.id;
};

export const getAllDocuments = async (collection: string) => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocumentById = async (collection: string, id: string) => {
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const updateDocument = async (collection: string, id: string, data: any) => {
  await db.collection(collection).doc(id).update(data);
};

export const deleteDocument = async (collection: string, id: string) => {
  await db.collection(collection).doc(id).delete();
};
