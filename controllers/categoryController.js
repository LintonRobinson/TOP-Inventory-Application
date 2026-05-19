const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const validateCategory = [
  body("categoryName").trim().notEmpty().withMessage("Category name cannot be empty or contain numbers"),
  body("categoryDescription").trim().notEmpty().withMessage("Category description cannot be empty"),
];
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
  const categoryId = req.params.id;
  const categoryName = req.body.categoryName;
  const categoryDescription = req.body.categoryDescription;
  db.updateCategory(categoryId, categoryName, categoryDescription);
  res.redirect("/");
}

module.exports = {
  validateCategory,
  insertCategory,
  updateCategory,
};
