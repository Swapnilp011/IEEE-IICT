
import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }
  
  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

export function getAdminSdks() {
  const app = getAdminApp();
  return {
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

export async function getCurrentUser() {
    const { auth } = getAdminSdks();
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
