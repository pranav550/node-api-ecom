const express = require("express");
const category_route = express();

const bodyParser = require("body-parser");
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({extended:false}));

const auth = require("../middleware/auth");
const categoryController = require("../controllers/categoryController")

category_route.post('/add-category',auth,categoryController.addCategory);

module.exports = category_route