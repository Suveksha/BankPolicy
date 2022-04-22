const { GraphQLID, GraphQLString } = require('graphql');
const mongoose=require('mongoose');

const CustomerSchema=new mongoose.Schema({
    cid:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    dob:{
        type:String,
        required:true
    },

    gender:{
        type:String,
        required:true
    },

    pid:{
        type:String,
        required:true
    }
})

const Customer=mongoose.model('customer',CustomerSchema);

module.exports=Customer;