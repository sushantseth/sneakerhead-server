const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });   

mongoose.connect('mongodb://localhost:27017/sneakerheadDB');



const shopSchema = new mongoose.Schema({
    url: String,
    brand: String,
    description: String,
    cost: Number,
    type: String,
    subtype: String,
    gender: String},{ timestamps: true }  //access timestamp with doc.createdAt
)

const Shop = mongoose.model('Shop',shopSchema)


//to use regular expression pattern searching in db
// { <field>: { $regex: /pattern/, $options: '<options>' } }


// app.get("/:id",(req,res)=>{
//     Shop.find({Description: req.params.id},(err,doc)=>{
//         if(err){console.log(err);}
//         else{
//             res.json(doc)
         
//         }
//     })
// })


app.get("/newarrival",(req,res)=>{
    Shop.find((err,doc)=>{
        if(err){console.log(err);}
        else{
            res.json(doc)
         
        }
    })
})

app.get("/collection",(req,res)=>{
    Shop.find((err,doc)=>{
        if(err){console.log(err);}
        else{
            res.json(doc)
         
        }
    })
})
app.get("/shoes",(req,res)=>{
    Shop.find({type: "shoes"},(err,doc)=>{
        if(err){console.log(err);}
        else{
            res.json(doc)
         
        }
    })
})
app.get("/apparel",(req,res)=>{
    Shop.find({type: "apparel"},(err,doc)=>{
        if(err){console.log(err);}
        else{
            res.json(doc)
         
        }
    })
})

app.get("/:id",(req,res)=>{
    Shop.find({brand: req.params.id},(err,doc)=>{
        if(err){console.log(err);}
        else{
            res.json(doc)
         
        }
    })
})
app.get("/search/:id",(req,res)=>{
    Shop.find({description: { $regex:req.params.id }},(err,doc)=>{
        if(err){console.log(err);}
        else{
            res.json(doc)
         
        }
    })
})
app.listen(8080 , function(err){
    
    console.log("Server listening on Port 8080");
})