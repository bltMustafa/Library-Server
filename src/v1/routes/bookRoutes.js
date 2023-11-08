const express = require("express");
const apicache = require("apicache");
const cache = apicache.middleware;

const bookController = require("../../controllers/bookController");

const router = express.Router();

router.get("/", cache("2 minutes"), bookController.getAllBooks);

router.get("/", bookController.getAllBooks);

router.get("/:bookId", bookController.getOneBook);

router.post("/", bookController.createNewBook);

router.delete("/:bookId", bookController.deleteOneBook);

module.exports = router;
