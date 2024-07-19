import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body , "req.body Ritesh");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role , email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const greeting = `Hello, ${user.email}!`;
    res.status(200).json({ token , greeting });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

export default router;
