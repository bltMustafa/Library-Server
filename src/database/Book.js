const DB = require("./db.json");

const { saveToDatabase } = require("./utils");

const getAllBooks = (filterParams) => {
  try {
    let books = DB.favoriteBooks;
    if (filterParams.title) {
      return DB.books.filter((favoritebook) =>
        favoritebook.title.toLowerCase().includes(filterParams.title)
      );
    }
    return books;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneBook = (bookId) => {
  try {
    const book = DB.favoriteBooks.find(
      (favoritebook) => favoritebook.id === bookId
    );
    if (!book) {
      throw {
        status: 400,
        message: `Can't find book with the id '${bookId}'`,
      };
    }
    return book;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewBook = (newBook) => {
  try {
    const isAlreadyAdded =
      DB.favoriteBooks.findIndex(
        (favoritebook) => favoritebook.title === newBook.title
      ) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Book with the title '${newBook.title}' already exits`,
      };
    }
    DB.favoriteBooks.push(newBook);
    saveToDatabase(DB);
    return newBook;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const deleteOneBook = (bookId) => {
  try {
    const indexForDeletion = DB.favoriteBooks.findIndex(
      (favoritebook) => favoritebook.id === bookId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find book with the id '${bookId}'`,
      };
    }
    DB.favoriteBooks.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = { getAllBooks, createNewBook, getOneBook, deleteOneBook };
