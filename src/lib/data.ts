
import type { User, Ticket } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: '/avatars/01.png',
    role: 'user',
    registrationDate: '2024-04-01T10:00:00Z',
    lastLogin: '2024-05-25T14:20:00Z',
  },
  {
    id: 'user-2',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    avatar: '/avatars/02.png',
    role: 'user',
    registrationDate: '2024-03-15T08:30:00Z',
    lastLogin: '2024-05-24T09:15:00Z',
  },
  {
    id: 'agent-1',
    name: 'Sam Wilson',
    email: 'sam.w@support.com',
    avatar: 'https://i.pravatar.cc/150?u=agent-1',
    role: 'agent',
    registrationDate: '2024-02-01T09:00:00Z',
    lastLogin: '2024-05-25T15:00:00Z',
  },
  {
    id: 'agent-2',
    name: 'Jessica Chen',
    email: 'jessica.c@support.com',
    avatar: 'https://i.pravatar.cc/150?u=agent-2',
    role: 'agent',
    registrationDate: '2024-02-05T11:00:00Z',
    lastLogin: '2024-05-24T12:00:00Z',
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@tickettrack.com',
    avatar: 'https://i.pravatar.cc/150?u=admin-1',
    role: 'admin',
    registrationDate: '2024-01-01T00:00:00Z',
    lastLogin: '2024-05-25T18:00:00Z',
  },
];

export const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Cannot reset my password',
    description:
      "I've been trying to reset my password using the 'Forgot Password' link, but I'm not receiving the reset email. I've checked my spam folder and it's not there. Can you please assist?",
    status: 'Resolved',
    category: 'Technical Support',
    createdBy: 'user-1',
    assignedTo: 'agent-1',
    createdAt: '2024-05-20T10:00:00Z',
    lastModified: '2024-05-23T14:30:00Z',
    feedback: 'upvote',
    comments: [
      {
        id: 'comment-1',
        ticketId: 'TKT-001',
        author: users.find(u => u.id === 'agent-1')!,
        content: 'Hi Alex, I will look into this for you. I will manually trigger a password reset link to your email.',
        createdAt: '2024-05-20T11:00:00Z',
      },
      {
        id: 'comment-2',
        ticketId: 'TKT-001',
        author: users.find(u => u.id === 'user-1')!,
        content: 'Thank you, Sam! I received it and was able to reset my password.',
        createdAt: '2024-05-20T11:30:00Z',
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Billing question about my last invoice',
    description:
      'My invoice #INV-123 seems to have an incorrect charge. It lists a "Service Fee" that I was not aware of. Could you clarify what this is for?',
    status: 'In Progress',
    category: 'Billing',
    createdBy: 'user-2',
    assignedTo: 'agent-2',
    createdAt: '2024-05-22T09:15:00Z',
    lastModified: '2024-05-24T11:00:00Z',
    comments: [
      {
        id: 'comment-3',
        ticketId: 'TKT-002',
        author: users.find(u => u.id === 'agent-2')!,
        content: "Hi Maria, I'm checking with our billing department regarding the service fee on your invoice. I'll get back to you shortly.",
        createdAt: '2024-05-22T09:45:00Z',
      },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'Feature request: Dark mode',
    description: 'The application is great, but a dark mode option would be much easier on the eyes, especially when working at night. Please consider adding this feature.',
    status: 'Open',
    category: 'General Inquiry',
    createdBy: 'user-1',
    createdAt: '2024-05-24T16:00:00Z',
    lastModified: '2024-05-24T16:00:00Z',
    comments: [],
  },
    {
    id: 'TKT-004',
    subject: 'Website is loading very slowly',
    description:
      "For the past few hours, the main dashboard has been extremely slow to load. All other websites are working fine on my connection. It's making it difficult to check my ticket statuses.",
    status: 'Open',
    category: 'Technical Support',
    createdBy: 'user-2',
    createdAt: '2024-05-25T11:00:00Z',
    lastModified: '2024-05-25T11:00:00Z',
    comments: [],
  },
  {
    id: 'TKT-005',
    subject: 'File attachment error',
    description:
      "When I try to attach a PDF file to my ticket reply, I get an 'Upload Failed' error. The file is only 2MB, which is within the size limit. I've tried with different PDF files and the issue persists.",
    status: 'In Progress',
    category: 'Bug Report',
    createdBy: 'user-1',
    assignedTo: 'agent-1',
    createdAt: '2024-05-25T14:20:00Z',
    lastModified: '2024-05-25T15:00:00Z',
    comments: [
       {
        id: 'comment-4',
        ticketId: 'TKT-005',
        author: users.find(u => u.id === 'agent-1')!,
        content: "Thanks for reporting this, Alex. We're investigating a potential issue with our file upload service and will update you here.",
        createdAt: '2024-05-25T15:00:00Z',
      },
    ],
  },
  {
    id: 'TKT-006',
    subject: 'How to export my ticket history?',
    description:
      'Is there a way to export my complete ticket history to a CSV or PDF file? I need it for my records. I looked in the profile settings but couldn\'t find an option.',
    status: 'Closed',
    category: 'General Inquiry',
    createdBy: 'user-2',
    assignedTo: 'agent-2',
    createdAt: '2024-05-18T10:00:00Z',
    lastModified: '2024-05-19T12:00:00Z',
    comments: [
        {
        id: 'comment-5',
        ticketId: 'TKT-006',
        author: users.find(u => u.id === 'agent-2')!,
        content: "Hi Maria, this feature is not yet available, but we're planning to add it in a future update. I'll mark this ticket as closed for now.",
        createdAt: '2024-05-19T12:00:00Z',
      },
    ],
  },
];
