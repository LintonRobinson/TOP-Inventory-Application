const { Client } = require("pg");

const SQL = `
CREATE TABLE categories (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT UNIQUE,
  description TEXT UNIQUE
);

CREATE TABLE items (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category INTEGER REFERENCES categories(id),
  name TEXT UNIQUE,
  quantity INTEGER,
  price REAL,
  description TEXT,
  notes TEXT,
  url TEXT
);
`;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done seeding");
}

main();
