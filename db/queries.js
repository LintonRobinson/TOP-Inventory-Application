const pool = require("./pool.js");

async function insertCategory(validatedCategory) {
  await pool.query("INSERT INTO categories (name, description) VALUES ($1,$2)", [validatedCategory.categoryName, validatedCategory.categoryDescription]);
}

module.exports = {
  insertCategory,
};
