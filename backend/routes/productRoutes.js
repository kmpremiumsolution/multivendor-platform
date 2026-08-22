const express = require('express');
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductsByVendor,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, authorize } = require('../middleware/auth');

// Get all products
router.get('/', getProducts);

// Get products by vendor
router.get('/vendor/:vendorId', getProductsByVendor);

// Get single product
router.get('/:id', getProductById);

// Create product
router.post('/', protect, authorize('vendor', 'admin'), createProduct);

// Update product
router.put('/:id', protect, authorize('vendor', 'admin'), updateProduct);

// Delete product
router.delete('/:id', protect, authorize('vendor', 'admin'), deleteProduct);

module.exports = router;
