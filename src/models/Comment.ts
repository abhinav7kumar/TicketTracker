import mongoose, { Schema, Document, Model, models, Types } from 'mongoose';

// Define an interface for the Comment document
export interface IComment extends Document {
  ticketId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
}

// Define the Mongoose schema
const CommentSchema: Schema<IComment> = new Schema({
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
    index: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: true, updatedAt: false }, // Only need createdAt
});

// To prevent model recompilation error in Next.js with HMR
const Comment: Model<IComment> = models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
