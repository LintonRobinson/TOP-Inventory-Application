const { Router } = require("express");
const categoryController = require("../controllers/categoryController.js");
const db = require("../db/queries.js");

const categoryRouter = Router();

categoryRouter.get("/new", (req, res) => {
  res.render("createCategory");
});

categoryRouter.get("/edit/:id", async (req, res) => {
  const categoryId = req.params.id;
  const category = await db.getCategory(categoryId);
  console.log("category", category);
  res.render("editCategory", { category: category });
});

categoryRouter.post("/edit/:id", categoryController.validateCategory, categoryController.updateCategory);

categoryRouter.post("/new", categoryController.validateCategory, categoryController.insertCategory);

module.exports = categoryRouter;
