const mongooose=require('mongoose');

const userSchema =new mongooose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    lists:[{
        type:mongooose.Schema.Types.ObjectId,
        ref:'List'
    }]
})

const User=mongooose.model('User',userSchema);
module.exports=User;