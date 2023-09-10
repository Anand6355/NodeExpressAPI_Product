// import express from "express";
// import userRoutes from './routes/users'

const mongoose = require('mongoose');

const express = require('express')

const bodyParser=require('body-parser');
const userRoutes = require('./routes/users')

//Import product model
const Product=require("./models/productModel")

const app=express();
const PORT=5000;

app.use(bodyParser.json());


app.get('/',(req,res)=>{
    console.log('[Test!]');
    res.send('hi this is home page')
})

app.get('/users',(req,res)=>{
    res.send('Hello this is user');
});

app.use(express.json());// tos send data in JSON format
//app.use(express.urlencoded({extended: false)}); // to use data format of form to send and retrive data in the middleware

//Code to fetch the data from database
app.get('/product',async(req,res)=>{
  try {
    const product=await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})
        // to get single product from database
        app.get('/product/:id',async(req,res)=>{
          try {
            const {id}=req.params;
            const product=await Product.findById(id);
            res.status(200).json(product);
          } catch (error) {
            res.status(500).json({message: error.message});
          }
        })

// Let's send data from user to data base ********* THis is how data is send to database
app.post('/product',async(req,res)=>{
  try{
    //to save data to the database
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
  }

})

//To update the product in the database
app.put('/product/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const product = await Product.findByIdAndUpdate(id,req.body);
    //check if product is not updated SHOW the error message
    if(!product){
      return res.status(404).json({message: `cannot find any product with ID ${id}`})
    }
    // we should get the updated data to show as message
    const updatedProduct=await Product.findById(id);
    res.status(200).json(updatedProduct);
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//To delete data from the database
app.delete('/product/:id', async(req,res)=>{
  try {
    const {id}=req.params;
    const product= await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message: `cannot find any product with ID ${id}`});
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose.set("strictQuery",false);
mongoose.connect('mongodb+srv://Anand:Anand123@nodeapi.0faecbx.mongodb.net/API?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>console.log(`Server running on port: http://localhost:${PORT}`));
}).catch((error)=>{
    console.log(error);
  });