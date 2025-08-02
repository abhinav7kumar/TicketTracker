'use server';

/**
 * @fileOverview A flow for suggesting ticket tags based on existing tickets.
 *
 * - suggestTicketTags - A function that suggests tags for new tickets based on the content of a resolved ticket.
 * - SuggestTicketTagsInput - The input type for the suggestTicketTags function.
 * - SuggestTicketTagsOutput - The return type for the suggestTicketTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTicketTagsInputSchema = z.object({
  resolvedTicketDescription: z.string().describe('The description of a resolved ticket to learn from.'),
  newTicketDescription: z.string().describe('The description of the new ticket that needs tags.'),
});
export type SuggestTicketTagsInput = z.infer<typeof SuggestTicketTagsInputSchema>;

const SuggestTicketTagsOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('Suggested tags for the new ticket.'),
});
export type SuggestTicketTagsOutput = z.infer<typeof SuggestTicketTagsOutputSchema>;

export async function suggestTicketTags(input: SuggestTicketTagsInput): Promise<SuggestTicketTagsOutput> {
  return suggestTicketTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTicketTagsPrompt',
  input: {schema: SuggestTicketTagsInputSchema},
  output: {schema: SuggestTicketTagsOutputSchema},
  prompt: `You are a ticket tagging expert. Based on the description of a previously resolved ticket, suggest relevant tags for a new ticket.

Resolved Ticket Description: {{{resolvedTicketDescription}}}

New Ticket Description: {{{newTicketDescription}}}

Based on the resolved ticket, provide a few concise tags that would be appropriate for the new ticket.`,
});

const suggestTicketTagsFlow = ai.defineFlow(
  {
    name: 'suggestTicketTagsFlow',
    inputSchema: SuggestTicketTagsInputSchema,
    outputSchema: SuggestTicketTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      suggestedTags: output?.suggestedTags || [],
    };
  }
);
