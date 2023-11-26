const express = require("express");
const ConnectDB = require("./Config/DB");
const Userrouter = require("./route/userRoutes");
const Blogrouter = require("./route/BlogRoutes");
const cors = require("cors")

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello World :)")
})
//()=>- Connect a Database to mongoDb;

ConnectDB();


app.use('/api/auth',Userrouter);
app.use('/api',Blogrouter);
app.listen(port,()=>{
    console.log(`listening at port ${port} :)`)
}) 