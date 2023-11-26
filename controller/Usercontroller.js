const {body,validationResult} = require("express-validator");
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || 'qngzmknud'
module.exports.validRegistration = [
    body("name").not().isEmpty().trim().withMessage("name is required"),
    body("email").not().isEmpty().isEmail().trim().withMessage("valid email is required"),
    body("password").isLength({min:6}).withMessage('password must be 6 character long')
]

module.exports.register= async(req,res) =>{
    const {name,email,password} = req.body
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
        return res.status(400).json({success,error:error.array()})
    }
    try {
        const checkuser = await User.findOne({email});
        if (checkuser) {
            return res.status(400).json({success,msg:"email is already in registeres"})
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        
        const user = await User.create({
            name,
            email,
            password:hash
        })
        success = true
        
        const token = jwt.sign({user},SECRET_KEY)
        return res.json({success,msg:"successfully registerd",token})
       


    } catch (error) {
        console.log(error)
        return res.status(500).json({success,error})
    }
    
}


module.exports.loginvalidation = [
    body("email").not().isEmpty().isEmail().trim().withMessage("valid email is required"),
    body("password").isLength({min:6}).withMessage('password must be 6 character long')
]
module.exports.login = async(req,res) =>{
  const error = validationResult(req);
  let success = false;
  const {email,password} =req.body;
  if(!email || !password){
    return res.status(400).json({success,msg:"fill all the required fields"})
  }

  if (!error.isEmpty()) {
    return res.status(400).json({success,msg:"something is wrong"})
  }
  
  try {
    const user = await User.findOne({email})
    if(user){
      const macthPass = await bcrypt.compare(password,user.password);
      if(macthPass){
          success =true;
          const token = jwt.sign({user},SECRET_KEY)
          return res.json({success,msg:"successfully login",token});
      }else{
        return res.status(401).json({success,msg:"incorrect password"})
      }
    }else{
      return res.status(404).json({success,msg:"user is not register"})
    } 
  } catch (error) {
    return res.status(500).json({success,error})
  }
}


module.exports.getuser = (req,res) => {
  try {
    let data = req.data;
    let success = false;
    console.log(data);
    success = true;
    return res.json({success,data});
  } catch (error) {
    console.log(error);

    return res.status(500).json({success,error:"internal server error"});
  }
}



