const path = require("node:path");
const express = require("express");
const app = express();
// SSR Static Asset Configuration
const assetsPath = path.join(__dirname, "public");
const PORT = 3000;
app.use(express.static(assetsPath));

// SSR View / View Ingine  Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Parse Form Input Values and Return Variables With Names
app.use(express.urlencoded({ extended: true }));

const categoryRouter = require("./routes/categoryRouter.js");

const db = require("./db/queries.js");
app.get("/", async (req, res) => {
  const categories = await db.getCategories();
  const items = await db.getItems();
  res.render("index", { title: "All Items", description: "All Shiraz Farm items.", categories: categories, categoryId: "1", items: items });
});

app.use("/category", categoryRouter);

// No Path Found Error Fallback
app.use((req, res, next) => {
  res.status(404).render("errorPage");
});

// Errors forwarded by next(err)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("errorPage");
});

app.listen(PORT, () => {
  (err) => {
    if (err) {
      console.error("Server failed to start:", err);
    } else {
      console.log(`Server running on port ${PORT}`);
    }
  };
});
