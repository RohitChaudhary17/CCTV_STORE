import mongoose from 'mongoose';
const { Schema } = mongoose;


const cartSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  }
});


const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel
