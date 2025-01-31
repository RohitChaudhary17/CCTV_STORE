import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Product schema with indexes
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,  
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    category: {
      type: Schema.Types.ObjectId, // Reference to Category model
      ref: 'Category',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId, // Reference to Brand model
      ref: 'Brand',
      required: true,
    },
    imageUrls: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

// Index the 'category' and 'brand' fields
productSchema.index({ category: 1 });  // Index on category field (1 for ascending order)
productSchema.index({ brand: 1 });     // Index on brand field (1 for ascending order)

// Create the Product model
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
