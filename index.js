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

//schema
const userSchema = mongoose.Schema({
  lastName: String,
  firstName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//model

const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res, next) => {
  res.send("server is up and running");
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({
    email: email,
  });
  //console.log(user)
  if (user) {
    res.send({ message: "Vous êtes déjà inscrit·e", alert: false });
  } else {
    const data = await userModel(req.body);
    const save = data.save();
    res.send({ message: "Inscrit·e avec succès !", alert: true });
  }
}),
  //api login

  app.post("/login", async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      const dataSend = {
        id: user._id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        image: user.image,
      };
      console.log(dataSend);
      res.send({ message: "vous êtes connecté·e !", alert: true, data: dataSend });
    }else {
      res.send({ message: "Désolée, ce compte n'existe pas", alert: false });
    }
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
