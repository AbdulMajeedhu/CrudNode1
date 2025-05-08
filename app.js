const express = require('express');
const app = express();
const cors =require("cors");

//middleweare
app.use(express.json());// entha requet um middle warw aah thandi than ulla varamudiyum
app.use(cors({
    origin:"http://localhost:3000"
}))

let students = []

app.get("/students",function(req,res){
    res.json(students);
})

app.post("/student",function(req,res){

        // * localserver conection **
    // console.log(req.body)
    req.body.id = students.length + 1;
    students.push(req.body)
    res.json({
        message:"student added succesfully"
    })
})
app.get("/student/:id",function(req,res){
    // console.log(req.params.id);
    const id = req.params.id;
    const student = students.find(student => student.id == id);  
    res.json(student);
})

app.put("/student/:id",function(req,res){
    // Find the student with the id
    const id = req.params.id ;
    const studentindex= students.findIndex(student => student.id == id);
    students[studentindex].email = req.body.email;
    students[studentindex].password = req.body.password; 
    res.json({message:"Updated Successfully!"})
})
app.delete("/student/:id",function(req,res){
    const id = req.params.id ;
    const studentindex= students.findIndex(student => student.id == id);
    students.splice(studentindex,1)
    res.json({message : "Deleted Successfully"});
})
app.listen(3001); 