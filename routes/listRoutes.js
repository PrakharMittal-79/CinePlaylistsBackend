const express = require("express");
const List = require("../models/List");
const User = require("../models/User");
const router = express.Router();
const jwt=require('jsonwebtoken')

router.post("/create", async (req, res) => {
  try {
    let { name, isPublic, user } = req.body;
    let getUser = await User.findById(user._id);
    let newList = new List({ name, isPublic, movies: [] });
    getUser.lists.push(newList);
    await newList.save();
    await getUser.save();
    res.status(200).send("List created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("lists");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/addMovie/:id", async (req, res) => {
  try {
    let list = await List.findById(req.params.id);
    const { movie } = req.body;
    list.movies.push(movie);
    await list.save();
    res.status(200).send("Movie added successfully");
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

const isAuthenticated=async (req,res,next)=>{
  try{
    const {id}=req.params;
    const list=await List.findById(id);
    if(!list.isPublic){
      if (req.cookies.jwt) {
        const user = jwt.verify(req.cookies.jwt, "itisthemostsecuresecretkey");
        const isAuthor=user.lists.filter((item)=>{
          return item==id
        })
        if(isAuthor.length==0){
         return res.status(401).send("Not a authorized user")
        }
    } else {
       return res.status(401).send("No user found");
    }
    }
    next();
  }
  catch(err){
    console.log(err)
    res.send(err);
  }
}

router.get('/viewList/:id',isAuthenticated,async (req,res)=>{
  try{
    const {id}=req.params;
    const list=await List.findById(id);
    res.status(200).send(list);
  }
  catch(err){
    console.log(err)
    res.status(500).send(err);
  }
})



module.exports = router;
