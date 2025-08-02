# **App Name**: TicketTrack Lite

## Core Features:

- User Authentication: Allow user registration/login using a secure email/password form with JWT-based session handling, redirecting to user dashboard on success.
- Ticket Creation: Enable ticket creation via a form with subject, rich text description (Markdown support), category dropdown. Optional file attachments (png, jpg, jpeg, pdf, doc, docx) with a 5MB limit per file. Auto-set ticket status to ‘Open’ on submission.
- Ticket Tracking (Dashboard): Show tickets created by the logged-in user, using a react-table, with columns for Ticket ID, Subject, Status, Category, Last Modified. Features pagination (10 per page) and sorting by last modified.
- Search & Filtering: Implement full-text search on subject and description. Offer filters for Ticket status (Open, Closed) and Category. Include sort options for Most Recently Modified.
- Replies & Updates: Ticket detail page displaying comments in chronological order. Allow users to view all comments and add replies. Enable @mention of support agents (notified within the application).
- User Profile & Settings: User profile allowing updates to personal information and preferences, and a summary view of ticket activity (open, resolved, closed).
- Resolution Feedback (AI): Once a ticket is resolved, provide a UI element to upvote or downvote the resolution. An AI tool will suggest tags for new tickets, based on positive and negative feedback to help categorize incoming similar tickets. This increases the chances that a previously successful resolution process is applied to similar new requests.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5), reminiscent of trustworthy professional tools.
- Background color: Very light blue (#F0F2FA), creating a calm and uncluttered space.
- Accent color: Muted violet (#9575CD), offering subtle highlights and contrast.
- Body font: 'Inter', a sans-serif, giving a modern, machined, objective, neutral feel for body text.
- Headline font: 'Space Grotesk', a sans-serif, offering a computerized, techy, scientific feel for headlines. Note: currently only Google Fonts are supported.
- Use flat, minimalist icons representing ticket status, categories, and user actions.
- Emphasize a clean, card-based design for tickets and a consistent grid system for dashboards.