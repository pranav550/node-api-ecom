const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ecom1")

const user_routes = require('./routes/userRoutes'); 
const store_routes = require('./routes/storeRoutes');
const category_routes = require('./routes/categoryRoutes');
const subCategory_routes = require('./routes/subCategoryRoutes');

app.use('/api',user_routes);
app.use('/api',store_routes);
app.use('/api',category_routes);
app.use('/api',subCategory_routes);

app.listen(3000,()=>{
    console.log("server is ready")
})