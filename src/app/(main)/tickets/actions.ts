
'use server';

import { tickets } from '@/lib/data';
import { sendEmail } from '@/services/email';

export async function createTicketAction(input: { subject: string; description: string; category: string }) {
    try {
        // In a real app, you would save the ticket to the database here.
        console.log("Creating ticket:", input);

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

        return { success: true };
    } catch (error) {
        console.error("Create Ticket Error:", error);
        return { success: false, error: "Failed to create ticket." };
    }
}


export async function addCommentAction(input: { ticketId: string; content: string }) {
    try {
        // In a real app, you would save the comment to the database here.
        console.log("Adding comment:", input);

        const ticket = tickets.find((t) => t.id === input.ticketId);
        if (!ticket) {
            return { success: false, error: "Ticket not found." };
        }

        await sendEmail({
            to: 'user@example.com', // This would be the ticket creator's email
            subject: `New reply on ticket: ${ticket.subject}`,
            body: `<h1>New Reply</h1><p>A new reply has been added to your ticket "${ticket.subject}".</p><p><b>Reply:</b> ${input.content}</p>`,
        });

        // Also notify mentioned users, etc.

        return { success: true };
    } catch (error) {
        console.error("Add Comment Error:", error);
        return { success: false, error: "Failed to add comment." };
    }
}
