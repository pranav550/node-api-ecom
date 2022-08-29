const express = require("express");
const sub_category_route = express();

const bodyParser = require("body-parser");
sub_category_route.use(bodyParser.json());
sub_category_route.use(bodyParser.urlencoded({extended:true}));

const auth = require("../middleware/auth");
const subCategoryController = require("../controllers/subCategoryController")

sub_category_route.post("/add-sub-category",auth,subCategoryController.create_subcategory)



module.exports = sub_category_route;
