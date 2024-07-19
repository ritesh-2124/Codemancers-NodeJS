import express from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { auth } from '../middlewares/auth';
import { sendCheckoutEmail } from '../utils/email';

const router = express.Router();

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: (req as any).user.id });
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    } else {
      const newCart = new Cart({ user: (req as any).user.id, products: [{ product: productId, quantity }] });
      await newCart.save();
    }
    res.status(200).send('Product added to cart');
  } catch (error) {
    res.status(500).send('Error adding to cart');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: (req as any).user.id }).populate('products.product');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send('Error fetching cart');
  }
});

router.post('/checkout', auth, async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: (req as any).user.id });
    if (!cart) return res.status(400).send('No cart found');
    
    cart.shippingAddress = shippingAddress;
    await cart.save();
    
    await sendCheckoutEmail((req as any).user.email);
    
    await Cart.deleteOne({ user: (req as any).user.id });
    res.status(200).send('Checkout successful');
  } catch (error) {
    res.status(500).send('Error during checkout');
  }
});


export default router;
