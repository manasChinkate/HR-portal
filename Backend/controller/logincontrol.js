const mongoose = require('mongoose')
const LoginSchema = require('../models/Login')
const jwt = require('jsonwebtoken')

const login =async (req,res) =>{
    const {email, password, authority} = req.body;

    // const user = LoginSchema.find({email:email})
    const user = await LoginSchema.find({email:email})
    // console.log("user",user)
 

    if(user){
        console.log(user)
        if(user.password == password){
            console.log("password found")
            const token = jwt.sign(
                { email: user.email, username: user.name, },
                "jwt-secret-key",
                { expiresIn: '1d' }
            );
            console.log("Token :", token)

            // localStorage.setItem("token",token)
        }else{
            res.json("Password is Incorrect")
        }
    }else{
        res.json("User not exist")
        console.log("User not exist")
    }
}

module.exports = login