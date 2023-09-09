const express=require('express');
const router = express.Router();

// All routes in this file starts with '/users'
router.get('/',(req,res)=>{
    res.send('Hello this is user');
});

