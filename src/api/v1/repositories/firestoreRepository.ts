import { db } from "../../../../config/firebaseConfig"

export const getDocuments = async (collection: string) => {
  return await db.collection(collection).get();
};

export const getDocumentById = async (collection: string, id: string) => {
  return await db.collection(collection).doc(id).get();
};

export const createDocument = async (collection: string, data: any, id: string) => {
  await db.collection(collection).doc(id).set(data);
};

export const updateDocument = async (collection: string, id: string, data: any) => {
  await db.collection(collection).doc(id).update(data);
};

export const deleteDocument = async (collection: string, id: string) => {
  await db.collection(collection).doc(id).delete();
};

export const queryDocuments = async (
  collection: string,
  field: string,
  operator: FirebaseFirestore.WhereFilterOp,
  value: any
) => {
  return await db.collection(collection).where(field, operator, value).get();
};

export default {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,   
};
