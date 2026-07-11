const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true, default: Date.now },
    genre: { type: String, required: false }
});

const Book = model('Book', bookSchema);

module.exports = Book;