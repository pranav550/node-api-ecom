const express = require("express");
const store_route = express();

const bodyParser = require("body-parser");
store_route.use(bodyParser.json());
store_route.use(bodyParser.urlencoded({extended:true}))

const multer = require("multer");
const path = require("path");

store_route.use(express.static('public'))

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname,"../public/storeImages"), function(error,success){
            if(error) throw error;
        })
    },
    filename:function(req, file, cb){
        const name = Date.now()+"-"+file.originalname;
        cb(null, name, function(error1,success){
            if(error1) throw error1;
        })
    }
})

const upload = multer({storage:storage});

const auth = require("../middleware/auth");
const StoreController =  require('../controllers/storeController')

store_route.post('/create-store',auth, upload.single('logo'),StoreController.create_Store);
store_route.post('/find-nearest-store',auth,StoreController.findNearstStore);


module.exports = store_route;