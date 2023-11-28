const mongoose = require("mongoose");
require('dotenv').config();

const mongoURL = process.env.PORT || "mongodb+srv://Rohan:Roh%40n123@cluster0.cuw8aev.mongodb.net/"

const ConnectDB = async() =>{
    await mongoose.connect(mongoURL,{   useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, }).then(()=>{console.log("connected")}).catch((err)=>{console.log(err)})
}
module.exports = ConnectDB;