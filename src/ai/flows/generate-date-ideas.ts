'use server';
/**
 * @fileOverview A Genkit flow for generating personalized date ideas based on user preferences.
 *
 * - generateDateIdeas - A function that handles the date idea generation process.
 * - GenerateDateIdeasInput - The input type for the generateDateIdeas function.
 * - GenerateDateIdeasOutput - The return type for the generateDateIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDateIdeasInputSchema = z.object({
  mood: z
    .string()
    .optional()
    .describe('The desired mood for the date (e.g., romantic, adventurous, relaxed).'),
  budget: z
    .string()
    .optional()
    .describe('The budget for the date (e.g., free, low-cost, moderate, luxurious).'),
  activityType: z
    .string()
    .optional()
    .describe('The type of activity desired (e.g., outdoor, indoor, creative, dining).'),
});
export type GenerateDateIdeasInput = z.infer<typeof GenerateDateIdeasInputSchema>;

const GenerateDateIdeasOutputSchema = z.object({
  ideas: z
    .array(z.string())
    .describe('A list of personalized and creative date ideas.'),
});
export type GenerateDateIdeasOutput = z.infer<typeof GenerateDateIdeasOutputSchema>;

export async function generateDateIdeas(
  input: GenerateDateIdeasInput
): Promise<GenerateDateIdeasOutput> {
  return generateDateIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDateIdeasPrompt',
  input: {schema: GenerateDateIdeasInputSchema},
  output: {schema: GenerateDateIdeasOutputSchema},
  prompt: `You are a creative assistant that generates personalized date ideas.

Generate a list of 3-5 unique and engaging date ideas based on the following preferences:

{{#if mood}}Mood: {{{mood}}}
{{/if}}{{#if budget}}Budget: {{{budget}}}
{{/if}}{{#if activityType}}Activity Type: {{{activityType}}}
{{/if}}

Consider combining these preferences to create a cohesive and enjoyable experience. Make sure the ideas are actionable and provide a brief description for each.

Output the ideas in a JSON array format, as specified by the output schema.`,
});

const generateDateIdeasFlow = ai.defineFlow(
  {
    name: 'generateDateIdeasFlow',
    inputSchema: GenerateDateIdeasInputSchema,
    outputSchema: GenerateDateIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
