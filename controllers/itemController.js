const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const validateItem = [
  body("itemName").trim().notEmpty().withMessage("Item name is required"),
  body("itemDescription").trim().notEmpty().withMessage("Item description is required"),
  body("itemCategory").trim().notEmpty().withMessage("Please select a valid category"),
  body("itemUrl").trim().notEmpty().isURL().withMessage("Item url is required and must be a valid url"),
  body("itemPrice").trim().notEmpty().isNumeric().withMessage("Item price is required and must be a number"),
  body("itemQuantity").trim().notEmpty().isInt({ min: 0 }).withMessage("Item quantity is required and must be a number and must be greater than 0"),
  body("itemNotes").trim(),
];

const validateAdminPassword = body("password").custom((value) => {
  if (value !== process.env.ADMIN_PASSWORD) {
    throw Error("Invalid Password.");
  }
  return true;
});

async function insertItem(req, res) {
  const errors = validationResult(req);
  const itemCategory = req.params.categoryId;

  if (!errors.isEmpty()) {
    const categories = await db.getCategories();
    return res.render("createItem", { categories: categories, itemCategory: itemCategory, errors: errors.array() });
  }

  const validatedItem = matchedData(req);

  await db.insertItem(itemCategory, validatedItem);
  res.redirect("/");
}

async function updateItem(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const categories = await db.getCategories();
    const itemId = req.params.id;
    const item = await db.getItem(itemId);
    const itemCategory = req.params.categoryId;
    return res.render("editItem", { categories: categories, itemCategory: itemCategory, item: item, errors: errors.array() });
  }
  const itemId = req.params.id;
  const validatedItem = matchedData(req);
  await db.updateItem(itemId, validatedItem);
  const categories = await db.getCategories();
  const items = await db.getItems();
  res.render("index", { title: "All Items", description: "All Shiraz Farm items.", categories: categories, categoryId: "view", items: items });
}

async function deleteItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const itemId = req.params.id;
    const item = await db.getItem(itemId);
    const itemCategory = req.params.id;
    const category = await db.getCategory(itemCategory);
    const categories = await db.getCategories();
    return res.render("editItem", { categories: categories, category: category, errors: errors.array(), itemCategory: itemCategory, item: item });
  }

  const itemId = req.params.id;
  await db.deleteItem(itemId);
  const categories = await db.getCategories();
  const items = await db.getItems();
  res.redirect("/");
}

async function getItemsByText(req, res) {
  const { text } = req.query;
  const categories = await db.getCategories();
  const items = await db.getItemsByText(text);
  console.log("items", items);
  res.render("index", { title: "Search Result", description: `Search Result for '${text}'`, categories: categories, categoryId: "view", items: items });
}

module.exports = {
  validateItem,
  validateAdminPassword,
  insertItem,
  updateItem,
  deleteItem,
  getItemsByText,
};
