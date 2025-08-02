import mongoose, { Schema, Document, Model, models } from 'mongoose';

// Define an interface for the Category document
export interface ICategory extends Document {
  name: string;
  description?: string;
}

// Define the Mongoose schema
const CategorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// To prevent model recompilation error in Next.js with HMR
const Category: Model<ICategory> = models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
