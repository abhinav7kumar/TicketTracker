
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'agent' | 'admin';
  registrationDate: string;
  lastLogin: string;
};

export type Comment = {
  id: string;
  ticketId: string;
  author: User;
  content: string;
  createdAt: string;
};

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  category: 'Billing' | 'Technical Support' | 'General Inquiry' | 'Bug Report' | string;
  createdBy: string; // User ID
  assignedTo?: string; // Agent User ID
  createdAt: string;
  lastModified: string;
  resolvedAt?: string;
  comments: Comment[];
  feedback?: 'upvote' | 'downvote';
};

export type Category = {
  id: string;
  name: string;
  description: string;
};
