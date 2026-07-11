
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Book = require('./models/Book.modal');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
//To get all Books
app.get('/', (req, res) => {
    
    Book.find()
        .then(books => res.json(books))
        .catch(err => {
            console.error('Error fetching books:', err);
            res.status(500).send('Internal Server Error');
        });
});
//To add a new Book
app.post('/', express.json(), (req, res) => {
    const data = req.body;
    Book.create(data)
        .then(book => res.status(201).json(book))
        .catch(err => {
            console.error('Error saving book:', err);
            res.status(500).send('Internal Server Error');
        });
});
app.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    Book.findByIdAndDelete(bookId)
        .then(() => res.sendStatus(204).json({ message: 'Book deleted' }))
        .catch(err => {
            console.error('Error deleting book:', err);
            res.status(500).send('Internal Server Error');
        });
    }
);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

