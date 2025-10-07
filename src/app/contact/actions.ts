'use server';

import { z } from 'zod';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getSdks } from '@/firebase';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const parsed = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      message: 'Invalid form data.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const { firestore } = getSdks(initializeApp(firebaseConfig));
    const messagesCollection = collection(firestore, 'contact_messages');
    
    await addDoc(messagesCollection, {
      ...parsed.data,
      createdAt: serverTimestamp(),
    });

    return {
      message: 'Your message has been sent successfully!',
      errors: null,
    };
  } catch (error) {
    console.error('Error saving message to Firestore:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      errors: null,
    };
  }
}
