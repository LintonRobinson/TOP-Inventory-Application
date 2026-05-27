const pool = require("../db/pool.js");
const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const validateCategory = [
  body("categoryName").trim().notEmpty().withMessage("Category name cannot be empty or contain numbers"),
  body("categoryDescription").trim().notEmpty().withMessage("Category description cannot be empty"),
];

const validateAdminPassword = body("password").custom((value) => {
  if (value !== process.env.ADMIN_PASSWORD) {
    throw Error("Invalid Password.");
  }
  return true;
});

async function insertCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("createCategory", { errors: errors.array() });
  }
  const validatedCategory = matchedData(req);
  await db.insertCategory(validatedCategory);
  res.redirect("/");
}

async function updateCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("createCategory", { errors: errors.array() });
  }
  const categoryId = req.params.categoryId;
  const categoryName = req.body.categoryName;
  const categoryDescription = req.body.categoryDescription;
  await db.updateCategory(categoryId, categoryName, categoryDescription);
  res.redirect("/");
}

async function deleteCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const categoryId = req.params.id;
    const category = await db.getCategory(categoryId);
    return res.render("editCategory", { category: category, errors: errors.array(), categoryId: categoryId });
  }

  const categoryId = req.params.id;
  await db.deleteCategory(categoryId);
  const categories = await db.getCategories();
  const items = await db.getItems();
  res.render("index", { title: "All Items", description: "All Shiraz Farm items.", categories: categories, categoryId: "view", items: items });
}

module.exports = {
  validateCategory,
  validateAdminPassword,
  insertCategory,
  updateCategory,
  deleteCategory,
};
