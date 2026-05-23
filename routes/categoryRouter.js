const { Router } = require("express");
const categoryController = require("../controllers/categoryController.js");
const itemRouter = require("../routes/itemRouter.js");
const db = require("../db/queries.js");

const categoryRouter = Router();

categoryRouter.get("/new", (req, res) => {
  res.render("createCategory");
});

categoryRouter.get("/edit/:id", async (req, res) => {
  const categoryId = req.params.id;
  const category = await db.getCategory(categoryId);
  res.render("editCategory", { category: category });
});

categoryRouter.get("/:id", async (req, res) => {
  const categoryId = req.query.categoryToView;
  const categories = await db.getCategories();
  const items = await db.getCategoryItems(categoryId);
  console.log("items", items);
  res.render("index", { title: "A different Cat", description: "All Shiraz Farm items.", categories: categories, categoryId: categoryId, items: items });
});

categoryRouter.post("/edit/:categoryId", categoryController.validateCategory, categoryController.updateCategory);

categoryRouter.post("/new", categoryController.validateCategory, categoryController.insertCategory);

categoryRouter.use("/:categoryId/item", itemRouter);

module.exports = categoryRouter;
