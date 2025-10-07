'use server';

import { generateContentSuggestion } from '@/ai/flows/admin-assisted-content-creation';
import { z } from 'zod';

const FormSchema = z.object({
  contentType: z.enum(['event', 'teamMember']),
  details: z.string(),
});

export async function generateContentAction(prevState: any, formData: FormData) {
  try {
    const parsed = FormSchema.safeParse({
      contentType: formData.get('contentType'),
      details: formData.get('details'),
    });

    if (!parsed.success) {
      return { ...prevState, error: 'Invalid form data.' };
    }

    const result = await generateContentSuggestion(parsed.data);

    if (!result.title || !result.description) {
        return { ...prevState, error: "AI failed to generate content. Please try again." };
    }

    return {
      title: result.title,
      description: result.description,
      error: null,
    };
  } catch (error) {
    console.error('Error generating content:', error);
    return {
        ...prevState,
        error: 'An unexpected error occurred while generating content. Please try again later.'
    };
  }
}
