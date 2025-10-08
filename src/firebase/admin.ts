
import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

function getAdminApp(): App | null {
  if (getApps().length > 0) {
    return getApp();
  }
  
  if (!serviceAccount) {
    return null;
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

export function getAdminSdks(): { auth: Auth; firestore: Firestore } | null {
  const app = getAdminApp();
  if (!app) {
    return null;
  }
  return {
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

export async function getCurrentUser() {
    const adminSdks = getAdminSdks();
    if (!adminSdks) {
        console.warn('Firebase Admin SDK not initialized. Skipping user check.');
        return null;
    }

    const { auth } = adminSdks;
    const sessionCookie = cookies().get('__session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
        const user = await auth.getUser(decodedIdToken.uid);
        return user;
    } catch (error) {
        console.error('Error verifying session cookie:', error);
        return null;
    }
}
