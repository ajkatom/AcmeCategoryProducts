const express = require("express");
const app = express();
const db = require("./db");
const path = require("path");
const port = process.env.PORT || 3000;
app.use(require("body-parser").json());

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.use("/api", require("./api"));

db
  .sync()
  .then(() => db.seed())
  .then(() => console.log("synced & seeded"));
