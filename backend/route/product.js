const express = require('express');
const router = express.Router();
const {addProduct,getAllProducts} = require('../controller/product');
const authMiddleware = require('../middleware/authController');

router.post('/addproduct',authMiddleware, addProduct);
router.get('/getAllProducts',authMiddleware, getAllProducts);
module.exports = router;
