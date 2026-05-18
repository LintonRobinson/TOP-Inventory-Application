const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");
const validateCategory = [
  body("categoryName").trim().notEmpty().isAlpha().withMessage("Category name cannot be empty or contain numbers"),
  body("categoryDescription").trim().notEmpty().withMessage("Category description cannot be empty"),
];
async function insertCategory(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("createCategory", { errors: errors.array() });
    }
    const validatedCategory = matchedData(req);
    await db.insertCategory(validatedCategory);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateCategory,
  insertCategory,
};
