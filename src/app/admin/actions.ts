
'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAdminSdks } from '@/firebase/admin';
import { revalidatePath } from 'next/cache';

const EventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  category: z.enum(['Workshop', 'Seminar', 'Competition', 'Webinar']),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  imageHint: z.string().optional(),
  status: z.enum(['upcoming', 'past']),
  registrationLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

const TeamMemberSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    bio: z.string().min(1, 'Bio is required'),
    imageUrl: z.string().url('Must be a valid URL'),
    imageHint: z.string().optional(),
    linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});


export async function createContentAction(prevState: any, formData: FormData) {
  const contentType = formData.get('contentType');

  try {
    const { firestore } = getAdminSdks();

    if (contentType === 'event') {
        const parsed = EventSchema.safeParse({
            title: formData.get('title'),
            date: formData.get('date'),
            category: formData.get('category'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            imageHint: formData.get('imageHint'),
            status: formData.get('status'),
            registrationLink: formData.get('registrationLink'),
        });

        if (!parsed.success) {
            return { message: 'Invalid event data.', errors: parsed.error.flatten().fieldErrors, success: false };
        }

        await addDoc(collection(firestore, 'events'), {
            ...parsed.data,
            createdAt: serverTimestamp(),
        });

        revalidatePath('/');
        return { message: 'Event created successfully!', errors: null, success: true };

    } else if (contentType === 'teamMember') {
        const parsed = TeamMemberSchema.safeParse({
            name: formData.get('name'),
            role: formData.get('role'),
            bio: formData.get('bio'),
            imageUrl: formData.get('imageUrl'),
            imageHint: formData.get('imageHint'),
            linkedin: formData.get('linkedin'),
        });
        
        if (!parsed.success) {
            return { message: 'Invalid team member data.', errors: parsed.error.flatten().fieldErrors, success: false };
        }

        await addDoc(collection(firestore, 'team_members'), {
            ...parsed.data,
            createdAt: serverTimestamp(),
        });

        revalidatePath('/#team');
        return { message: 'Team member created successfully!', errors: null, success: true };
    }

    return { message: 'Invalid content type.', errors: null, success: false };

  } catch (error) {
    console.error('Error creating content:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
        message: `Failed to create content: ${errorMessage}`,
        errors: null,
        success: false,
    };
  }
}
