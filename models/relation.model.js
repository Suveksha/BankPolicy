const mongoose=require('mongoose');

const RelationSchema=new mongoose.Schema({
    pid:{
        type:String,
        required:true
    },
    cid:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})

const Relation=mongoose.model('relation',RelationSchema);
module.exports=Relation;