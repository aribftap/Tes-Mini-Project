const Book = require('../models/bookModel');

exports.createBook = (req, res) => {
    const newBook = req.body;
    Book.createBook(newBook, (err, result) => {
        if (err) {
            res.status(500).json({
                code: 500,
                status: 'failed',
                message: 'Internal Server Error',
                data: []
            });
        } else {
            res.status(201).json({
                code: 201,
                status: 'success',
                message: 'Book created successfully',
                data: { id: result.insertId, ...newBook }
            });
        }
    });
};

exports.getAllBooks = (req, res) => {
    Book.getAllBooks((err, books) => {
        if (err) {
            res.status(500).json({
                code: 500,
                status: 'failed',
                message: 'Internal Server Error',
                data: []
            });
        } else {
            res.json({
                code: 200,
                status: 'success',
                message: 'Books retrieved successfully',
                data: books
            });
        }
    });
};

exports.getBookById = (req, res) => {
    Book.getBookById(req.params.id, (err, book) => {
        if (err) {
            res.status(500).json({
                code: 500,
                status: 'failed',
                message: 'Internal Server Error',
                data: []
            });
        } else if (!book.length) {
            res.status(404).json({
                code: 404,
                status: 'failed',
                message: 'Book not found',
                data: []
            });
        } else {
            res.json({
                code: 200,
                status: 'success',
                message: 'Book retrieved successfully',
                data: book
            });
        }
    });
};

exports.updateBook = (req, res) => {
    const updatedBook = req.body;
    Book.updateBook(req.params.id, updatedBook, (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                status: 'failed',
                message: 'Internal Server Error',
                data: []
            });
        } else {
            res.json({
                code: 200,
                status: 'success',
                message: 'Book updated successfully',
                data: { id: req.params.id, ...updatedBook }
            });
        }
    });
};

exports.deleteBook = (req, res) => {
    Book.deleteBook(req.params.id, (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                status: 'failed',
                message: 'Internal Server Error',
                data: []
            });
        } else {
            res.status(200).json({
                code: 200,
                status: 'success',
                message: 'Book deleted successfully',
                data: []
            });
        }
    });
};