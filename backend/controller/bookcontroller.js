const Book = require("../models/bookmodel");
const asynchandler = require("express-async-handler");

//get all book
const getbook = asynchandler(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  const bookQuery = Book.find({});
  if (limit) {
    bookQuery.limit(limit);
  }

  const book = await bookQuery;
  res.status(200).json({
    count: book.length,
    data: book
  });
});

//get only one book

const getOnebook = asynchandler(async (req, res) => {
  const { _id } = req.params;
  const book = await Book.findById({ _id });
  res.status(200).json(book);
});

//update book details

const updatebook = asynchandler(async (req, res) => {
  const books = req.body;

  if (!Array.isArray(books) || books.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of books");
  }
  const updateResults = [];

  for (const book of books) {
    const { title, author, imgUrl, price, wasPrice, discount, section } = book;

    if (!title) {
      res.status(400);
      throw new Error("fields are mandatory");
    }

    // Check if a book with the same title and author already exists
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      // Update the book with new values
      const updatedBook = await Book.findByIdAndUpdate(
        existingBook._id,
        { imgUrl, price, wasPrice, discount, section },
        { new: true } // Return the updated document
      );
      updateResults.push(updatedBook);
    } else {
      res.status(404);
      throw new Error(`Book with title '${title}' by '${author}' not found`);
    }
  }

  try {
    // Return the result of the updates
    res.status(200).json({
      message: `${updateResults.length} books were updated.`,
      count: updateResults.length,
      data: updateResults
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error updating books");
  }
});

//create new book
const createbook = asynchandler(async (req, res) => {
  const books = req.body;

  if (!Array.isArray(books) || books.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of books");
  }

  const booksToCreate = [];

  for (const book of books) {
    const { title, author, imgUrl, price, wasPrice, discount, section } = book;

    if (!title) {
      res.status(400);
      throw new Error("fields are mandatory");
    }

    // Check if a book with the same title and author already exists
    const existingBook = await Book.findOne({ title, author });

    if (!existingBook) {
      // If no such book exists, add it to the list of books to create
      booksToCreate.push({
        title,
        author,
        imgUrl,
        price,
        wasPrice,
        discount,
        section
      });
    }
  }

  try {
    // Create the new books only if there are any to create
    if (booksToCreate.length > 0) {
      const createdBooks = await Book.insertMany(booksToCreate);
      res.status(201).json({
        message: `${createdBooks.length} new books were created.`,
        count: createdBooks.length,
        data: createdBooks
      });
    } else {
      res
        .status(200)
        .json({ message: "No new books were added. Books already exist." });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error creating books");
  }
});

//delete

const deletebook = asynchandler(async (req, res) => {
  const { _id } = req.params;
  const book = await Book.findByIdAndDelete(_id);
  if (book) {
    res.status(200).json({ message: "book delete successfully" });
  } else {
    res.status(400);
    throw new Error("Book not Found");
  }
});

module.exports = { getbook, createbook, getOnebook, updatebook, deletebook };
