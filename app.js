const express = require('express');
const bodyParser = require('body-parser');

let books = [
    {
        bookId: 1,
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookId: 2,
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];

const app = express();

// Setting EJS as the view engine
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for home page, rendering all books
app.get("/", (req, res) => {
    res.render("home", { data: books });
});

// Adding a new book
app.post("/", (req, res) => {
    const { bookName, bookAuthor, bookPages, bookPrice } = req.body;

    books.push({
        bookId: books.length + 1, // Incremental bookId
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookPages: parseInt(bookPages),
        bookPrice: parseFloat(bookPrice),
        bookState: "Available"
    });

    res.render("home", { data: books });
});

// Issuing a book
app.get('/issue/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    books.forEach(book => {
        if (book.bookId === bookId && book.bookState === "Available") {
            book.bookState = "Issued";
        }
    });

    res.redirect('/');
});

// Returning a book
app.get('/return/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    books.forEach(book => {
        if (book.bookId === bookId && book.bookState === "Issued") {
            book.bookState = "Available";
        }
    });

    res.redirect('/');
});

// Deleting a book
app.get('/delete/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    // Filter out the book that matches the ID
    books = books.filter(book => book.bookId !== bookId);

    res.redirect('/');
});

// Start the server on port 3001 or fallback to available port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});