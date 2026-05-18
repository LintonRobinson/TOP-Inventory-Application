const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://lintonrobinson:@localhost:5432/top_inventory_application",
});
