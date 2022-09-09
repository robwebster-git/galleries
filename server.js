if (process.env.NODE_ENV !== "production") {
  console.log("Not in production environment, loading dotenv");
  require("dotenv").config();
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
}

// https://git.heroku.com/rw-image-galleries.git

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000);
