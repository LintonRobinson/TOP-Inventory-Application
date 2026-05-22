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

module.exports = itemRouter;
