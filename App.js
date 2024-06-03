require('dotenv').config();
const express=require('express');
const mongoose= require('mongoose');
const app=express();
const authRoutes=require('./routes/authRoutes')
const listRoutes=require('./routes/listRoutes')
const cookieParser=require('cookie-parser');
const cors=require('cors');
const BASE_URL=process.env.BASE_URL

const db_URL=process.env.db_URL 

mongoose.connect(db_URL)
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log(err)
    console.log("DB Connection failed");
})

app.use(cookieParser());
app.use(cors({origin:BASE_URL,credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use(authRoutes);
app.use(listRoutes);

const PORT=process.env.PORT || 8080;
app.listen(8080,()=>{
    console.log('server is running on port 8080');
})