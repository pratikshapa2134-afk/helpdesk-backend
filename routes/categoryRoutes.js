const router = require('express').Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.get('/', verifyToken, getCategories);
router.post('/', verifyToken, verifyRole('Super Admin'), createCategory);
router.delete('/:id', verifyToken, verifyRole('Super Admin'), deleteCategory);
module.exports = router;