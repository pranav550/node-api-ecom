const express = require("express");
const common_route = express();
const bodyParser = require("body-parser");

common_route.use(bodyParser.json());
common_route.use(bodyParser.urlencoded({extended:true}));

const auth =require("../middleware/auth");

const commonController = require("../controllers/commonController");
common_route.get('/data-count',auth, commonController.data_count)


module.exports = common_route;