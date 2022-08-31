const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ecom1")

const user_routes = require('./routes/userRoutes'); 
const store_routes = require('./routes/storeRoutes');
const category_routes = require('./routes/categoryRoutes');
const subCategory_routes = require('./routes/subCategoryRoutes');
const product_routes = require("./routes/productRoutes");
const common_routes = require("./routes/commonRoutes");
const cart_routes = require("./routes/cartRoutes");
const address_routes = require("./routes/addressRoutes");
const buy_product_routes = require("./routes/buyProductRoutes");


app.use('/api',user_routes);
app.use('/api',store_routes);
app.use('/api',category_routes);
app.use('/api',subCategory_routes);
app.use('/api',product_routes);
app.use('/api',common_routes);
app.use('/api',cart_routes);
app.use('/api',address_routes)
app.use('/api',buy_product_routes)

app.listen(3000,()=>{
    console.log("server is ready")
})