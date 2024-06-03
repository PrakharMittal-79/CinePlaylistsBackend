const mongooose=require('mongoose');

const listSchema =new mongooose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    isPublic:{
        type:Boolean,
        required:true,
    },
    movies:[{
        
    }]
})

const List=mongooose.model('List',listSchema);
module.exports=List;