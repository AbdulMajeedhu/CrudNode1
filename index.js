const express = require('express');
const app = express();
const cors =require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const URL =process.env.DB;


//middleweare
app.use(express.json());// entha requet um middle warw aah thandi than ulla varamudiyum
app.use(cors({
    origin:"*",
    // origin:"http://localhost:3000",
}))

let students = []; 

app.get("/students",async function(req,res){
    try{
        // ** If we connect the data to Database we follow this 4 Steps
   //Open the connection
      const connection = await mongoClient.connect(URL)
      //Select the DB
      const db = connection.db("b35wd-tamil");
      //Select the collection and do the operation
      let students = await db.collection("students").find().toArray();
      //Close the connection
      await connection.close();
      res.json(students)
      }catch(error){
       console.log(error)
      }
})

app.post("/student", async function(req,res){
       try{
         // ** If we connect the data to Database we follow this 4 Steps
    //Open the connection
       const connection = await mongoClient.connect(URL)
       //Select the DB
       const db = connection.db("b35wd-tamil");
       //Select the collection and do the operation
       await db.collection("students").insertOne(req.body)
       //Close the connection
       await connection.close();
       res.json({
        message:"student added successfully",
       })
       }catch(error){
        console.log(error)
       }
});

app.get("/student/:id",async function(req,res){
    try{
        // ** If we connect the data to Database we follow this 4 Steps
   //Open the connection
      const connection = await mongoClient.connect(URL)
      //Select the DB
      const db = connection.db("b35wd-tamil");
      //Select the collection and do the operation
     let student = await db.collection("students").findOne({_id:new mongodb.ObjectId(req.params.id)})
      //Close the connection
      await connection.close();
      res.json(student)
      }catch(error){
       console.log(error)
      }
})

app.put("/student/:id",async function(req,res){
    try{
        // ** If we connect the data to Database we follow this 4 Steps
        //Open the connection
        const connection = await mongoClient.connect(URL)
        //Select the DB
        const db = connection.db("b35wd-tamil");
        //Select the collection and do the operation
        let student = await db.collection("students").updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:req.body});
         //Close the connection
         await connection.close();
         res.json({
             message:"Student Updated Successfully"
         })
       }catch(error){
         console.log(error)
       }
});

app.delete("/student/:id",async function(req,res){
  try{
   // ** If we connect the data to Database we follow this 4 Steps
   //Open the connection
   const connection = await mongoClient.connect(URL)
   //Select the DB
   const db = connection.db("b35wd-tamil");
   //Select the collection and do the operation
   let student = await db.collection("students").deleteOne({_id:new mongodb.ObjectId(req.params.id)});
    //Close the connection
    await connection.close();
    res.json({
        message:"Student Deleted Successfully"
    })
  }catch(error){
    console.log(error)
  }
})


 async function dbconnectionCheck(){
  try{
    // ** If we connect the data to Database we follow this 4 Steps
//Open the connection
  const connection = await mongoClient.connect(URL)
  //Select the DB
  const db = connection.db("b35wd-tamil");
  //Select the collection and do the operation
  let students = await db.collection("students").find().toArray();
  console.log('db connected');
  //Close the connection
  await connection.close();
  // res.json(students)
  }catch(error){
   console.log(error)
  }
}; 
dbconnectionCheck();
console.log("hi");
// app.listen(3001);
app.listen(process.env.PORT || 3001);