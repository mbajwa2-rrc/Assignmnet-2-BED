import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as serviceAccount from "../serviceAccountKey.json";

// eslint-disable-next-line @typescript-eslint/no-var-requires

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();
export { db };


