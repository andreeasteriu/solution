require("dotenv").config();
const express = require("express");
const app = express();
const routes = require(__dirname + "/routes/routes");
const mongoose = require("mongoose");

global.db = "";

// Mongo connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api", routes);

const PORT = process.env.PORT || 9999;
app.listen(PORT, (err) =>
  err
    ? console.log("Server ERROR...")
    : console.log("Server listening on port: " + PORT)
);
