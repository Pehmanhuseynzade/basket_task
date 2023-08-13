const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
app.use(cors())
app.use(bodyParser.json())
dotenv.config()

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const phoneSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
  });
  
  const phoneModel = mongoose.model("phone", phoneSchema);
  
  


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })