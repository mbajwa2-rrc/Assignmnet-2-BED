import { db } from "../../../../config/firebaseConfig";

export const getDocuments = async (collectionName: string) => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot;
};

export const getDocumentById = async (collectionName: string, id: string) => {
  const doc = await db.collection(collectionName).doc(id).get();
  return doc.exists ? doc : null;
};

export const createDocument = async (collectionName: string, data: any, id: string) => {
  await db.collection(collectionName).doc(id).set(data);
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  await db.collection(collectionName).doc(id).update(data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  await db.collection(collectionName).doc(id).delete();
};
