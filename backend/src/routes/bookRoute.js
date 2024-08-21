import { Router } from "express";
import multer from "multer";
import BookController from "../controller/bookController.js";
const router = Router();

let imageName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});

const upload = multer({ storage });

const bookController = new BookController();

router.post("/add", upload.single("image"), (req, res) => {
  bookController.addBook(req, res, imageName);
});

//get all books also ?limit=20
router.get("/",bookController.getBooks);

//individual book
router.get("/:id", bookController.getBookById);

//update book by id
router.put("/update/:id",bookController.updateBookById);

//delete book per id
router.delete("/delete/:id",bookController.deleteBookById);

router.get("/search/all",bookController.searchBook);

export default router;
