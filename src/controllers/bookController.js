const bookService = require("../services/bookService");

const getAllBooks = (req, res) => {
  const { title } = req.query;
  try {
    const allBooks = bookService.getAllBooks({ title });
    res.send({ status: "OK", data: allBooks });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneBook = (req, res) => {
  const {
    params: { bookId },
  } = req;
  if (!bookId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':bookId' can not be empty" },
    });
  }

  try {
    const book = bookService.getOneBook(bookId);
    res.send({ status: "OK", data: book });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewBook = (req, res) => {
  const { body } = req;
  if (!body.title || !body.thumbnail) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'title', 'thumbnail'",
      },
    });
    return;
  }

  const newBook = {
    title: body.title,
    thumbnail: body.thumbnail,
  };

  try {
    const createdBook = bookService.createNewBook(newBook);
    res.status(201).send({ status: "OK", data: createdBook });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneBook = (req, res) => {
  const {
    params: { bookId },
  } = req;

  if (!bookId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':bookId' can not be empty" },
    });
  }
  try {
    bookService.deleteOneBook(bookId);
    res.send("Delete an existing book");
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  createNewBook,
  deleteOneBook,
};
