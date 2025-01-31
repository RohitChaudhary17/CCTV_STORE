import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Brand schema
const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    logoUrl: {
      type: String, // URL for brand logo
      required: false,
    },
  },
  { timestamps: true }
);

// Create the Brand model
const BrandModel = mongoose.model('Brand', brandSchema);

export default BrandModel;
