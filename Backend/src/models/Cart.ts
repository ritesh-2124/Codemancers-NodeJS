import { Schema, model, Document } from 'mongoose';

interface ICart extends Document {
  user: Schema.Types.ObjectId;
  products: { product: Schema.Types.ObjectId; quantity: number }[];
  shippingAddress: string;
}

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, default: 1 } }],
  shippingAddress: { type: String, required: false },
});

const Cart = model<ICart>('Cart', cartSchema);

export default Cart;
