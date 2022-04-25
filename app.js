const express=require('express');
const cors=require('cors')
const env=require('./environment.json')
const {graphqlHTTP}=require('express-graphql');

const app=express();
app.use(cors());
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://suvekshachettri04:suvekshachettri@cluster0.t3lvt.mongodb.net/Bank?retryWrites=true&w=majority").then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err);   
})
// mongoose.connection.on('connected',()=>console.log("Mongodb Connected"));
const schema=require('./schema/schema.js');


app.use('/bank', graphqlHTTP({
    schema,
    graphiql:true
}))

// app.use(function (req, res, next) {
//     let originalSend = res.send;
//     res.send = function (data) {
//         console.log(data);
//         originalSend.apply(res, Array.from(arguments));
//     }
//     next();
// })

app.listen(4000, ()=>{
    console.log("Listening to port 4000");
})


// 'mongodb://localhost:27017'