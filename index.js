const express=require('express');
const { authRouter } = require('./routes/auth.routes.js');
const { connection } = require('./config/db.js');
const { recipeRouter } = require('./routes/recipe.routes.js');

const app=express()
require('dotenv').config()

const port=process.env.Port || 4200;
app.use(express.json())
const cors=require("cors")
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Getting the details"})
})

//Authentication
app.use("/users",authRouter)

//Recipes
app.use("/recipe",recipeRouter)


app.listen(port,async()=>{
    try {
        await connection;
        console.log("Server connected with mongo database")  
    } catch (error) {
        console.log("Cannot connected to Server with mongo database")
        console.log(error)
    }
    console.log(`Server is running at ${port}`)
})