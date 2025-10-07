'use server';

/**
 * @fileOverview An AI-powered content generation tool for admins to create engaging text and descriptions for events and team member profiles.
 *
 * - generateContentSuggestion - A function that generates content suggestions based on the provided type and details.
 * - ContentSuggestionInput - The input type for the generateContentSuggestion function.
 * - ContentSuggestionOutput - The return type for the generateContentSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentSuggestionInputSchema = z.object({
  contentType: z
    .enum(['event', 'teamMember'])
    .describe('The type of content to generate a suggestion for.'),
  details: z
    .string()
    .describe(
      'Details about the event or team member to generate content for.'
    ),
});
export type ContentSuggestionInput = z.infer<typeof ContentSuggestionInputSchema>;

const ContentSuggestionOutputSchema = z.object({
  title: z.string().describe('A suggested title for the content.'),
  description: z.string().describe('A suggested description for the content.'),
});
export type ContentSuggestionOutput = z.infer<typeof ContentSuggestionOutputSchema>;

export async function generateContentSuggestion(
  input: ContentSuggestionInput
): Promise<ContentSuggestionOutput> {
  return generateContentSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentSuggestionPrompt',
  input: {schema: ContentSuggestionInputSchema},
  output: {schema: ContentSuggestionOutputSchema},
  prompt: `You are an AI assistant helping an administrator create content for the IEEE Student Branch IICT MGM University website.

You will generate a title and a description for the content based on the content type and details provided. The content should be engaging and tailored to the IEEE Student Branch's style and audience.  Use the IEEE blue color (#1f5582) as an inspirational guide.

Content Type: {{{contentType}}}
Details: {{{details}}}

Generate a title and a description based on the provided details.`,
});

const generateContentSuggestionFlow = ai.defineFlow(
  {
    name: 'generateContentSuggestionFlow',
    inputSchema: ContentSuggestionInputSchema,
    outputSchema: ContentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);