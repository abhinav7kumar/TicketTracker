'use server';

import { suggestTicketTags } from '@/ai/flows/suggest-ticket-tags';
import { tickets } from '@/lib/data';

export async function suggestTagsAction(input: { newTicketDescription: string }) {
  try {
    // For demo purposes, we find the first resolved ticket to use as context for the AI.
    // In a real application, you might use vector search to find a truly similar ticket.
    const resolvedTicket = tickets.find((t) => t.status === 'Resolved' && t.feedback);
    if (!resolvedTicket) {
      return { success: false, error: 'No relevant resolved tickets found to learn from.' };
    }

    const aiInput = {
      feedback: resolvedTicket.feedback || 'upvote',
      ticketDescription: resolvedTicket.description,
      newTicketDescription: input.newTicketDescription,
    };
    
    const { suggestedTags } = await suggestTicketTags(aiInput);
    
    if (!suggestedTags || suggestedTags.length === 0) {
      return { success: true, data: ['No suggestions found'] };
    }

    return { success: true, data: suggestedTags };
  } catch (error) {
    console.error('AI Tag Suggestion Error:', error);
    return { success: false, error: 'An unexpected error occurred while suggesting tags.' };
  }
}
