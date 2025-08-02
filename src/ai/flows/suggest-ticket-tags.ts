'use server';

/**
 * @fileOverview A flow for suggesting ticket tags based on resolution feedback.
 *
 * - suggestTicketTags - A function that suggests tags for new tickets based on feedback on resolved tickets.
 * - SuggestTicketTagsInput - The input type for the suggestTicketTags function.
 * - SuggestTicketTagsOutput - The return type for the suggestTicketTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTicketTagsInputSchema = z.object({
  feedback: z
    .string()
    .describe("Feedback on the resolved ticket, either 'upvote' or 'downvote'."),
  ticketDescription: z.string().describe('The description of the resolved ticket.'),
  newTicketDescription: z.string().describe('The description of the new ticket.'),
});
export type SuggestTicketTagsInput = z.infer<typeof SuggestTicketTagsInputSchema>;

const SuggestTicketTagsOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('Suggested tags for the new ticket based on the feedback.'),
});
export type SuggestTicketTagsOutput = z.infer<typeof SuggestTicketTagsOutputSchema>;

export async function suggestTicketTags(input: SuggestTicketTagsInput): Promise<SuggestTicketTagsOutput> {
  return suggestTicketTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTicketTagsPrompt',
  input: {schema: SuggestTicketTagsInputSchema},
  output: {schema: SuggestTicketTagsOutputSchema},
  prompt: `You are a ticket tagging expert. Based on the feedback provided for a resolved ticket and its description, suggest relevant tags for a new, similar ticket.

Resolved Ticket Description: {{{ticketDescription}}}
Feedback: {{{feedback}}}

New Ticket Description: {{{newTicketDescription}}}

Suggested Tags:`,
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
