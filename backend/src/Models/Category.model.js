import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Category schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate categories
      trim: true,  // Automatically remove extra spaces
    },
    description: {
      type: String,
      required: false, // Optional description for category
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Category model
const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;
