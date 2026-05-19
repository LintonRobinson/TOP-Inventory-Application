const pool = require("./pool.js");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ");
  return rows;
}

async function getCategory(categoryId) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [categoryId]);
  return rows[0];
}

async function insertCategory(validatedCategory) {
  await pool.query("INSERT INTO categories (name, description) VALUES ($1,$2)", [validatedCategory.categoryName, validatedCategory.categoryDescription]);
}

async function updateCategory(categoryId, categoryName, categoryDescription) {
  await pool.query("UPDATE categories SET name = $2, description = $3 WHERE id = $1", [categoryId, categoryName, categoryDescription]);
}

module.exports = {
  insertCategory,
  updateCategory,
  getCategories,
  getCategory,
};
