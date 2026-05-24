const { Router } = require("express");
const itemRouter = Router({ mergeParams: true });
const db = require("../db/queries.js");
const itemController = require("../controllers/itemController.js");

itemRouter.get("/new", async (req, res) => {
  const categories = await db.getCategories();
  const itemCategory = req.params.categoryId;
  res.render("createItem", { categories: categories, itemCategory: itemCategory });
});

itemRouter.post("/new", itemController.validateItem, itemController.insertItem);

itemRouter.get("/view/:id", async (req, res) => {
  const categories = await db.getCategories();
  const itemId = req.params.id;
  const item = await db.getItem(itemId);
  const itemCategory = req.params.categoryId;
  res.render("viewItem", { categories: categories, itemCategory: itemCategory, item: item });
});
itemRouter.get("/edit/:id", async (req, res) => {
  const categories = await db.getCategories();
  const itemId = req.params.id;
  const item = await db.getItem(itemId);
  const itemCategory = req.params.categoryId;
  res.render("editItem", { categories: categories, itemCategory: itemCategory, item: item });
});

itemRouter.post("/edit/:id", itemController.validateItem, itemController.updateItem);

module.exports = itemRouter;
