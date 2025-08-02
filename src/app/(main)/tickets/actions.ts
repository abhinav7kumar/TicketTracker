
'use server';

import { revalidatePath } from 'next/cache';
import { tickets, users } from '@/lib/data';
import { sendEmail } from '@/services/email';
import type { Ticket } from '@/lib/types';

export async function createTicketAction(input: {
  subject: string;
  description: string;
  category: string;
}) {
  try {
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: input.subject,
      description: input.description,
      category: input.category as Ticket['category'],
      status: 'Open',
      createdBy: 'user-1', // In a real app, this would be the logged-in user's ID
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      comments: [],
    };

    tickets.unshift(newTicket);
    console.log('Creating ticket:', newTicket);

    await sendEmail({
      to: 'abhinav.kumar9888@gmail.com',
      subject: `[New Ticket] ${input.subject}`,
      body: `<h1>New Ticket Created</h1>
             <p>A new ticket has been submitted with the following details:</p>
             <ul>
               <li><b>Subject:</b> ${input.subject}</li>
               <li><b>Category:</b> ${input.category}</li>
             </ul>
             <h3>Description:</h3>
             <p>${input.description}</p>`,
    });
    
    revalidatePath('/dashboard');
    revalidatePath('/agent/dashboard');
    return { success: true, ticketId: newTicket.id };
  } catch (error) {
    console.error('Create Ticket Error:', error);
    return { success: false, error: 'Failed to create ticket.' };
  }
}

export async function addCommentAction(input: {
  ticketId: string;
  content: string;
  authorId: string;
}) {
  try {
    const { ticketId, content, authorId } = input;
    const ticket = tickets.find((t) => t.id === ticketId);
    const author = users.find((u) => u.id === authorId);

    if (!ticket) {
      return { success: false, error: 'Ticket not found.' };
    }
    if (!author) {
      return { success: false, error: 'Author not found.' };
    }

    const newComment = {
      id: `comment-${new Date().getTime()}`,
      ticketId,
      author: author,
      content,
      createdAt: new Date().toISOString(),
    };

    ticket.comments.push(newComment);
    ticket.lastModified = new Date().toISOString();
    
    // If an agent replies, set status to In Progress
    if(author.role === 'agent' && ticket.status === 'Open') {
      ticket.status = 'In Progress';
    }

    console.log('Adding comment:', newComment);

    const ticketCreator = users.find(u => u.id === ticket.createdBy);

    if (ticketCreator) {
        await sendEmail({
            to: ticketCreator.email, 
            subject: `New reply on ticket: ${ticket.subject}`,
            body: `<h1>New Reply from ${author.name}</h1><p>A new reply has been added to your ticket "${ticket.subject}".</p><p><b>Reply:</b> ${content}</p>`,
        });
    }

    revalidatePath(`/tickets/${ticketId}`);
    return { success: true };
  } catch (error) {
    console.error('Add Comment Error:', error);
    return { success: false, error: 'Failed to add comment.' };
  }
}
