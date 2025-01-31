// models/Order.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Order schema
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model
      required: true,  // Every order is associated with a user
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',  // Assuming you have a Product schema
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    
    totalAmount: {
      type: Number,
      required: true, // Total amount for the order
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'],
      default: 'Pending', // Order starts as pending
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Pending',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      required: false, // Optional, you can update once delivered
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Order model
const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
