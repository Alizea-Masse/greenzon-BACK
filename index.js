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

  // api
  // app.get("/", (req, res, next) => {
  //   res.send("server is up and running");
  // });



   //User section

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
  
//Login

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
      //console.log(dataSend);
      res.send({ message: `Vous êtes connecté·e ${user.firstName} !`, alert: true, data: dataSend });
    }else {
      res.send({ message: "Désolée, ce compte n'existe pas", alert: false });
    }
  });


  //Product Section

  //schema
const productSchema = mongoose.Schema({
  nom: String,
  categorie: String,
  image: String,
  prix: String,
  description: String,
});

//model

const productModel = mongoose.model("product", productSchema);

// Save product in DB

app.post("/uploadProduct", async (req, res) => {
  const data = await productModel(req.body)
  const dataSave = await data.save()
  res.send({message:"Article ajouté avec succès !"})
 

})

// get products

app.get("/product", async (req,res)=>{
  
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})




  // Server runing
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
