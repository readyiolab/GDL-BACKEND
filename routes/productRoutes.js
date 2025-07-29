const express = require('express');
const router = express.Router();
const { getCategories, getProducts, getProductDetail, getCountries } = require('../controllers/productController');
const detectCountry = require('../middleware/detectCountry');

router.get('/categories', getCategories);
router.get('/products', detectCountry, getProducts);
router.get('/product/:id', detectCountry, getProductDetail);
router.get('/countries', getCountries);

module.exports = router;