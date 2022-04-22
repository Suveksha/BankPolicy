const { GraphQLID, GraphQLString, GraphQLInt } = require('graphql');
const mongoose=require('mongoose');

const PolicySchema=new mongoose.Schema({
    pid:{
        type:String,
        required:true
    },
    // cid:{
    //     type:String,
    //     required:true
    // },
    issueDate:{
        type:String,
        required:true
    },
    premium:{
        type:Number,
        required:true
    },
    sumEnsured:{
        type:Number,
        required:true
    }
})

const Policy=mongoose.model('policy',PolicySchema);

module.exports=Policy;