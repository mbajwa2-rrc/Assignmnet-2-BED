import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("./serviceAccountKey.json") as ServiceAccount;

initializeApp({
  credential: cert(serviceAccount),
});

const db: Firestore = getFirestore();
export { db };


