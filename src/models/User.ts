import mongoose, { Schema, Document, Model, models } from 'mongoose';

// Define an interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Password is required but should not be returned in queries by default
  role: 'user' | 'agent' | 'admin';
  avatar?: string;
  registrationDate: Date;
  lastLogin?: Date;
}

// Define the Mongoose schema
const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    select: false, // Prevents password from being returned in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'agent', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// To prevent model recompilation error in Next.js with HMR
const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
