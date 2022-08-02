const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/').get(getAllCategories);

router.route('/:id').get(getCategoryById);

router.route('/').post(addCategory);

router.route('/:id').put(updateCategory);

router.route('/:id').delete(deleteCategory);

module.exports = router;
