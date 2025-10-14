import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase app using the service account
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

// Get a Firestore reference
const db: Firestore = getFirestore();

export { db };
