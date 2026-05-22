const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const validateItem = [
  body("itemName").trim().notEmpty().withMessage("Item name is required"),
  body("itemDescription").trim().notEmpty().withMessage("Item description is required"),
  body("itemCategory").trim().notEmpty().withMessage("Please select a valid category"),
  body("itemUrl").trim().notEmpty().isURL().withMessage("Item url is required and must be a valid url"),
  body("itemPrice").trim().notEmpty().isNumeric().withMessage("Item price is required and must be a number"),
  body("itemQuantity").trim().notEmpty().isNumeric().withMessage("Item quantity is required and must be a number"),
  body("itemNotes").trim(),
];

async function insertItem(req, res) {
  const errors = validationResult(req);
  const itemCategory = req.params.categoryId;

  if (!errors.isEmpty()) {
    const categories = await db.getCategories();
    return res.render("createItem", { categories: categories, itemCategory: itemCategory, errors: errors.array() });
  }

  const validatedItem = matchedData(req);

  console.log("validatedItemmm", validatedItem);
  await db.insertItem(itemCategory, validatedItem);
  res.redirect("/");
}

module.exports = {
  validateItem,
  insertItem,
};
