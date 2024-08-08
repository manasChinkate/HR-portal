const mongoose = require('mongoose')
const LoginSchema = require('../models/Login')
const jwt = require('jsonwebtoken')

const login =async (req,res) =>{
    const {email, password, authority} = req.body;

    // const user = LoginSchema.find({email:email})
    const user = await LoginSchema.findOne({email:email})
    // console.log("user",user)
 
 
    if(user){
        
        if(user.password == password){
            console.log("password found")
           try {
            const token = jwt.sign(
                { email: user.email, username: user.name, },
                "jwt-secret-key",
                { expiresIn: '1d' }

            );
            console.log("Token :", token)
            res.status(200)
            res.json({
                authority:user.authority,
                email:user.email,
                name:user.name

            })
           } catch (error) {
            console.log("err :", error)
           }
            // localStorage.setItem("token",token)
        }else{
            res.status(500).send("Password is Incorrect")
        }
    }else{
        res.status(500).send("User not exist")
        console.log("User not exist")
    }
}

module.exports = login