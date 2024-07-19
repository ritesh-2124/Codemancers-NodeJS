import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import cartRoutes from './routes/cart';
var cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
  
  connectDB();

export default app;
