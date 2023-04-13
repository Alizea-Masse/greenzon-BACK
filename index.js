require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
// Pour que la réponse ne soit pas undefind
// limit pour que l'image puisse rentrer
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));



//api
app.get("/", (req, res, next) => {
  res.send("server is up and running");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
