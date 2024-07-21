import express from 'express';
import Product from '../models/Product';
import { auth, admin } from '../middlewares/auth';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/', [auth, admin, upload.single('image')], async (req : any, res : any) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file?.path;
    if (!image) return res.status(400).send('Image is required');
    // update the mame of the image
    const product = new Product({ title, description, price, image : image });
    await product.save();
    console.log(req.user);
    res.status(201).send(`Product ${title} created By ${req.user.email}`);
  } catch (error) {
    res.status(500).send('Error creating product');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

export default router;
