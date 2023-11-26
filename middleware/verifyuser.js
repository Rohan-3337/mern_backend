
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY || "qngzmknud";

console.log(JWT_SECRET)
const verifyuser = async(req,res,next) =>{
    const token = req.header("auth-token");
    if(!token){
        res.statusCode = 401;
        return res.json({error: "Invalid token"});
    } 
    try {
        if(jwt){
            const data = jwt.verify(token,JWT_SECRET);
            req.data = data;
            next();


        }
        
    } catch (error) {
        res.statusCode = 500;
        return res.json({error});
        
    }
}
module.exports = verifyuser;