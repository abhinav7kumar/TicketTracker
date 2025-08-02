import mongoose, { Schema, Document, Model, models, Types } from 'mongoose';

// Define an interface for the Ticket document
export interface ITicket extends Document {
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  category: Types.ObjectId;
  createdBy: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  createdAt: Date;
  lastModified: Date;
  resolvedAt?: Date;
  feedback?: 'upvote' | 'downvote';
}

// Define the Mongoose schema
const TicketSchema: Schema<ITicket> = new Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required.'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  resolvedAt: {
    type: Date,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  feedback: {
    type: String,
    enum: ['upvote', 'downvote'],
  },
}, {
  timestamps: { createdAt: true, updatedAt: false }, // Use built-in createdAt, manually handle lastModified
});

// Update lastModified timestamp before each save
TicketSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

// To prevent model recompilation error in Next.js with HMR
const Ticket: Model<ITicket> = models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);

export default Ticket;
