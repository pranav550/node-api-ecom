const express = require("express");
const product_route = express();

const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");
const path = require("path");

product_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,path.join(__dirname,'../public/productImages'),function(error,success){
            if(error) throw error
         })
    },
    filename:function(req, file, cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name,function(error1,success){
          if(error1) throw error1;
        })
    },
}) 

const upload = multer({storage:storage});

const auth = require("../middleware/auth");
const productController = require("../controllers/productController");

product_route.post('/add-product', upload.array('images'), auth, productController.add_product)
product_route.get('/get-products', auth, productController.getProducts)
product_route.get('/search-product', auth, productController.searchproduct)

module.exports = product_route;

