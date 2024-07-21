import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth';
import productRoutes from './src/routes/product';
import cartRoutes from './src/routes/cart';
var cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
