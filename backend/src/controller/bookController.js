import { Op } from "sequelize";
import bookModel from "../models/bookModel.js";
import urlConstants from "../constants/urlConstants.js";
export default class bookController {
  //add book data
  async addBook(req, res, imageName) {

    try{
      const data = await bookModel.create({ ...req.body, image: imageName });
    if (data) {
      res.json(data);
    } else
      res.json({ sucess: false, message: "Error during Adding the book." });
  } catch (err) {
       res.json({success: false, message: err})
  }
}

  async getBooks(req, res) {
    let { limit } = req.query;
 
    if (!limit) limit = 20;
    try{
    const data = await bookModel.findAll({
      limit: parseInt(limit),
      raw: true,
    });

    for (let d of data) {
      d.image = urlConstants.IMG_PATH_URL + d.image;
      console.log(d.image);
    }
    res.json(data);
  } catch (err) {
     res.json({success: false, message:err})
  }
}

  //get book by Id
  async getBookById(req, res) {
    const { id } = req.params;
    try{
    if (id && !isNaN(id)) {
      const data = await bookModel.findByPk(id);
      data ? res.json(data) : res.send({ message: "Not Found" });
    } else {
      res.json({ success: false, message: "Book Id not provided" });
    }
  } catch(err){
      res.json({success: false, message:err})
  }
}

  async updateBookById(req, res) {
    const { id } = req.params;

    try{
    if (id && !isNaN(id)) {
      const data = await bookModel.update(req.body, {
        where: {
          id,
        },
      });

      if (data[0]) {
        res.json({ success: true, message: "Successfully Updated" });
      } else {
        res.json({ success: false, message: "Couldn't Update Book" });
      }
    } else {
      res.json({ success: false, message: "Book Id not provided" });
    }
  } catch(err) {
    res.json({success: false, message: err})
  }
}

  async deleteBookById(req, res) {
    const { id } = req.params;
    try{
    if (id && !isNaN(id)) {
      const data = await bookModel.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.json({ success: true, message: "Successfully Deleted" });
      } else {
        res.json({ success: false, message: "Couldn't Delete Book" });
      }
    } else {
      res.json({ success: false, message: "Book Id not provided" });
    }
  } catch(err){
     res.json({success: false, message: err})
  }
}

  async searchBook(req, res) {
    const { q } = req.query;
    try{
    if (q) {
      const data = await bookModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.iLike]: `%${q}%`,
            },
            author: {
              [Op.iLike]: `%${q}%`,
            },
          },
        },
      });

      console.log(data);
      res.json(data);
    } else {
      res.json({ success: false, message: "Empty Query Search string." });
    }
  }
  catch(err){
    res.json({success: false, message: err})
  }
  }
}
