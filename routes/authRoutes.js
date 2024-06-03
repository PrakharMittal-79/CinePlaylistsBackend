const express=require('express');
const User = require('../models/User');
const router=express.Router();
const bcrypt=require('bcrypt');
const genrateToken = require('./jsonwebtoken');
const jwt=require('jsonwebtoken');

router.get('/user',(req,res)=>{
    if (req.cookies.jwt) {
        const ress = jwt.verify(req.cookies.jwt, "itisthemostsecuresecretkey");
        res.status(200).send(ress);
    } else {
        res.status(401).send("No user found");
    }
})

router.post('/register',async (req,res)=>{
    const userData=req.body;
    const isUser=await User.findOne({email:userData.email});
    if(isUser!=null){
        res.status(400).send("User already exist");
    }
    const hashpassword=await bcrypt.hash(userData.password,11);
    const newUser=await User.create({
        name:userData.name,
        email:userData.email,
        password:hashpassword
    })
    res.status(200).send("User created successfully")
});

router.post('/login',async (req,res)=>{
    const userData=req.body;
    const isUser=await User.findOne({email:userData.email});
    if(isUser==null){
        return res.status(404).send("You need to register first");
    }
    const isPassCorrect=await bcrypt.compare(userData.password,isUser.password).catch((err) => res.status(400).send(err));;
    if(!isPassCorrect){
        return res.status(400).send("Incorrect Credentials");
    }
    const token=genrateToken(isUser);
    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.status(200).send({
        token:token,
        userData:isUser,
        msg:"Logged in successfully"
    })
})

router.get('/logout',(req,res)=>{
    res.clearCookie("jwt");
    req.user=null;
    res.status(200).send("Logged out successfully");
})

module.exports=router;