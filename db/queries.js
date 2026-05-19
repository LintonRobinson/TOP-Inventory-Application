const pool = require("./pool.js");

async function insertCategory(validatedCategory) {
  await pool.query("INSERT INTO categories (name, description) VALUES ($1,$2)", [validatedCategory.categoryName, validatedCategory.categoryDescription]);
}

async function updateCategory(categoryId, categoryName, categoryDescription) {
  await pool.query("UPDATE categories SET name = $2, description = $3 WHERE id = $1", [categoryId, categoryName, categoryDescription]);
}

module.exports = {
  insertCategory,
  updateCategory,
};
