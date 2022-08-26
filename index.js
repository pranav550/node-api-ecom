const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ecom1")

const user_routes = require('./routes/userRoutes'); 

app.use('/api',user_routes);

app.listen(3000,()=>{
    console.log("server is ready")
})