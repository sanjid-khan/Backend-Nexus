require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4001;

const BookStore = [
    { id: 1, name: "Harry Potter", author: "DevFlux" },
    { id: 2, name: "Friends", author: "Vikas" },
    { id: 3, name: "Nexus", author: "Rohit" },
    { id: 4, name: "DSA", author: "Maharaj" },
    { id: 5, name: "Prem kahani", author: "Rohan" },
    { id: 6, name: "Heloo", author: "Vikas" },
];



// GET all books (with optional name query - case insensitive)
app.get("/book", (req, res) => {
    const { name } = req.query;

    if (name) {
        const books = BookStore.filter(
            b => b.name.toLowerCase().includes(name.toLowerCase())
        );

        if (books.length === 0) {
            return res.status(404).send("No books found with that name");
        }

        return res.status(200).json(books);
    }

    res.status(200).json(BookStore);
});



// GET by ID
app.get("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send("Invalid ID format");
    }

    const book = BookStore.find(b => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    res.status(200).json(book);
});



// POST - Add new book
app.post("/book", (req, res) => {
    const { id, name, author } = req.body;

    if (!id || !name || !author) {
        return res.status(400).send("Missing fields: id, name, and author are required");
    }

    const exists = BookStore.find(b => b.id === id);

    if (exists) {
        return res.status(409).send("Book with this ID already exists");
    }

    BookStore.push({ id, name, author });

    res.status(201).json({
        message: "Book added successfully",
        book: { id, name, author }
    });
});



// PATCH - Partial update
app.patch("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send("Invalid ID format");
    }

    const book = BookStore.find(b => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    if (!req.body.name && !req.body.author) {
        return res.status(400).send("Provide at least name or author to update");
    }

    if (req.body.name) book.name = req.body.name;
    if (req.body.author) book.author = req.body.author;

    res.status(200).json({
        message: "Book updated successfully",
        book
    });
});



// PUT - Full update
app.put("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send("Invalid ID format");
    }

    const book = BookStore.find(b => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    const { name, author } = req.body;

    if (!name || !author) {
        return res.status(400).send("Missing fields: name and author are required for full update");
    }

    book.name = name;
    book.author = author;

    res.status(200).json({
        message: "Book fully updated",
        book
    });
});



// DELETE
app.delete("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send("Invalid ID format");
    }

    const index = BookStore.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).send("Book not found");
    }

    const deleted = BookStore.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully",
        book: deleted[0]
    });
});



app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});