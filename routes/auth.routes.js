const express=require('express');
const { AuthModel } = require('../model/auth.model');
const authRouter=express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt=require("bcrypt")
const saltRounds=3;
/***Registration By The User */
authRouter.post("/",async(req,res)=>{
    const {first,last,email,password,place}=req.body;
    try {
        bcrypt.hash(password, saltRounds, async(err, hash)=>{
            // Store hash in your password DB.
            const user=new AuthModel({first:first,last:last,email:email,password:hash,place:place})
            await user.save()
            res.status(200).send({'msg':"Registration has been done",'data':user})
        });
        
    } catch (error) {
        res.status(400).send({'msg':error.message})
    }

})

/**Log in By The User */
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await AuthModel.findOne({email:email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                // result == true
                if(result){
                    res.status(200).send({'msg':"Login Successfull!!",'data':user,'token' : jwt.sign({ userId: user._id }, process.env.secret, { expiresIn: '60' })});
                }else{
                    res.status(200).send({"msg":"Wrong Password!!"})
                }
            });
            
        }else{
            res.status(200).send({'msg':"Some error occured in Login"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})



module.exports={
    authRouter
}
