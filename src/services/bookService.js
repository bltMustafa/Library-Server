const Book = require("../database/Book");

const { v4: uuid } = require("uuid");

const getAllBooks = (filterParams) => {
  try {
    const allBooks = Book.getAllBooks(filterParams);
    return allBooks;
  } catch (error) {
    throw error;
  }
};
const getOneBook = (bookId) => {
  try {
    const book = Book.getOneBook(bookId);
    return book;
  } catch (error) {
    throw error;
  }
};
const createNewBook = (newBook) => {
  const bookToInsert = {
    ...newBook,
    id: uuid(),
    createdAt: new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    }),
    updatedAt: new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    }),
  };
  try {
    const createdBook = Book.createNewBook(bookToInsert);
    return createdBook;
  } catch (error) {
    throw error;
  }
};

const deleteOneBook = (bookId) => {
  try {
    Book.deleteOneBook(bookId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  createNewBook,
  deleteOneBook,
};
