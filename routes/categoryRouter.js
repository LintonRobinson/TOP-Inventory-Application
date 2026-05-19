const { Router } = require("express");
const categoryController = require("../controllers/categoryController.js");

const categoryRouter = Router();

categoryRouter.get("/new", (req, res) => {
  res.render("createCategory");
});

categoryRouter.get("/edit/:id", (req, res) => {
  res.render("editCategory");
});

categoryRouter.post("/edit/:id", categoryController.validateCategory, categoryController.updateCategory);

categoryRouter.post("/new", categoryController.validateCategory, categoryController.insertCategory);

module.exports = categoryRouter;
