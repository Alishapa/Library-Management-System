const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Book_category: {
        type: String,
        required: true,
    },
    Star_rating: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Stock: {
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;