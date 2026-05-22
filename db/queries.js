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

async function getItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function insertItem(categoryId, validatedItem) {
  await pool.query("INSERT INTO items (category,name, quantity,price,description,notes,url) VALUES ($1,$2,$3,$4,$5,$6,$7)", [
    validatedItem.itemCategory,
    validatedItem.itemName,
    validatedItem.itemQuantity,
    validatedItem.itemPrice,
    validatedItem.itemDescription,
    validatedItem.itemNotes,
    validatedItem.itemUrl,
  ]);
}

module.exports = {
  insertCategory,
  updateCategory,
  getCategories,
  getCategory,
  getItems,
  insertItem,
};
