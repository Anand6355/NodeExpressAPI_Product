// import express from "express";
// import userRoutes from './routes/users'
const express = require('express')

const bodyParser=require('body-parser');
const userRoutes = require('./routes/users')

const app=express();
const PORT=5000;

app.use(bodyParser.json());


app.get('/',(req,res)=>{
    console.log('[Test!]');
    res.send('hi this is home page')
})

app.listen(PORT,()=>console.log(`Server running on port: http://localhost:${PORT}`));