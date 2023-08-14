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
  
//POST
  app.post('/api/phones',async(req,res)=>{
    const {name,price,image} = req.body
    const newPhones = phoneModel({
      name:name,
      price:price,
      image:image
    })
    await newPhones.save()
    res.status(201).send({
      message:"Phones Post Successfully!",
      payload:newPhones
    })
  })

  //GET ALL
  app.get('/api/phones',async(req,res)=>{
    const{name} = req.query
    getPhones = await phoneModel.find()
    if(!name){
      res.status(200).send(getPhones)
    }
    else{
      const searchedPhones = await getPhones.filter((x)=>
      x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
      )
      res.status(200).send(searchedPhones)
    }
  })

  //GET BY ID

  app.get('/api/phones/:id',async(req,res)=>{
    const{id}=req.params
    const phoneID = await phoneModel.findById(id)
    res.status(200).send(phoneID)
  })

  //DELETE

  app.delete('/api/phones/:id',async(req,res)=>{
    const id = req.params.id
    const deletePhones = await phoneModel.findByIdAndDelete(id)
    res.status(202).send({
      message:`${deletePhones.name} successfully deleted!`
    })
  })

  //PUT
  app.put('/api/phones/:id',async(req,res)=>{
    const id = req.params.id
    const {name,price,image} = req.body;
    const updatedPhone = {
      name: name,
      price: price,
      image:image
    }
    await phoneModel.findByIdAndUpdate(id,updatedPhone)
    res.status(200).send(updatedPhone)
  })

  DB_CONNECTION = process.env.DB_CONNECTION
  DB_PASSWORD = process.env.DB_PASSWORD

  mongoose
  .connect(DB_CONNECTION.replace("<password>", DB_PASSWORD))
  .then(() => console.log("MangoDB Connected!!!"));

  PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });