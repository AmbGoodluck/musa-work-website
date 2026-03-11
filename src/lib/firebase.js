import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*
 * ─── Firestore security rules ────────────────────────────────────────────────
 * Replace the current deny-all rules in Firebase Console → Firestore → Rules:
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     function isSignedIn() { return request.auth != null; }
 *
 *     match /activities/{docId} {
 *       allow read: if true;
 *       allow create, update, delete: if isSignedIn();
 *     }
 *   }
 * }
 *
 * ─── Storage security rules ──────────────────────────────────────────────────
 * Firebase Console → Storage → Rules:
 *
 * rules_version = '2';
 * service firebase.storage {
 *   match /b/{bucket}/o {
 *     function isSignedIn() { return request.auth != null; }
 *     match /uploads/activities/{docId}/{fileName} {
 *       allow read:  if true;
 *       allow write: if isSignedIn();
 *     }
 *   }
 * }
 */

const firebaseConfig = {
  apiKey:            "AIzaSyA8ZT7QSy5bpszIdQWmhOaeepuq61hYkj8",
  authDomain:        "musa-s-dashboard.firebaseapp.com",
  projectId:         "musa-s-dashboard",
  storageBucket:     "musa-s-dashboard.firebasestorage.app",
  messagingSenderId: "293840816147",
  appId:             "1:293840816147:web:59a58d8144478fe43997e6",
};

const app = initializeApp(firebaseConfig);

export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
