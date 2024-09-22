import cors from 'cors'
import express from "express"
import mongoose from "mongoose"
import { users } from "./schema-models/users.js"

const app=express()

app.use(express.json())
app.use(cors())

app.get("/users", async(req,res)=>{
console.log("resposnse")
const ret= await users.find()
console.log("return objec:",ret)
res.status(200).json(ret)
})

app.post("/users",(req,res)=>{
   console.log(req.body)
   const objUser = {
    name: req.body.name,
    email: req.body.email
   }
  const userData= new users(objUser)
  userData.save()
  res.status(201).json({message:"user Inserted"})
})

app.delete("/users/:id",async (req,res)=>{
  const retDelete= await users.findByIdAndDelete({_id:req.params.id})
  res.status(200).json(retDelete)
})
app.put("/users/:id",async (req,res)=>{
   const name= req.body.name;
   const email=req.body.email;
   const _id=req.params.id;
    const retUpdated= await users.findByIdAndUpdate({_id}, {name:name,email:email},{new:true})
    res.status(200).json(retUpdated)
  })
app.listen(3000,()=>{
    console.log("server started");
    mongoose.connect("mongodb://127.0.0.1:27017/MernDEMO").then(()=>{
        console.log("successfull connect database")
    })
})