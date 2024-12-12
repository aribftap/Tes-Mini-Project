const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, bookController.getAllBooks);
router.get('/:id', verifyToken, bookController.getBookById);
router.post('/', verifyToken, bookController.createBook);
router.put('/:id', verifyToken, bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);

module.exports = router;
