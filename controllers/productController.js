const Product = require("../models/productModel");
const CategoryController = require("../controllers/categoryController");
const StoreController = require("../controllers/storeController"); 

const add_product = async(req,res)=>{
try{
  const arrImages = [];
  for(let i=0; i<req.files.length;i++){
    arrImages[i]= req.files[i].filename;
  }

  const addProduct = await new Product({
    vendor_id:req.body.vendor_id,
    store_id:req.body.store_id,
    name:req.body.name,
    price:req.body.price,
    discount:req.body.discount,
    category_id:req.body.category_id,
    sub_cat_id:req.body.sub_cat_id,
    images:arrImages,
  }) 

  const product_data = await addProduct.save();
  res.status(200).send({success:true,message:"Product Details",data:product_data})


}catch(error){
   res.status(400).send({success:false,message:error.message})
}
}

const getProducts =  async (req,res)=>{
    try{
      var send_Data = [];
      var cat_data = await CategoryController.get_categories();
      
      if(cat_data.length>0){
          for(let i=0; i<=cat_data.length; i++){
            var product_data=[];
            let cat_id = cat_data[i]['_id'].toString();
            var cat_product = await Product.find({category_id:cat_id});
            if(cat_product.length>0){
                for(let j=0; j<cat_product.length;j++){
                 var storeData = await StoreController.get_store(cat_product[j]['store_id']);
                 product_data.push(
                    {
                        "product_name":cat_product[j]['name'],
                        "images":cat_product[j]['images'],
                        "store_address":storeData.address
                    }
                    )
                }
                send_Data.push({
                    "category":cat_data[i]['category'],
                    "product":product_data
                })
            }
           
            else{
                res.send(200).send({success:true,msg:"Product Details", data:send_Data})  
            }
          }
          res.send(200).send({success:true,msg:"Product Details", data:send_Data})
      }else{
        res.status(200).send({success:false,message:error.message})
      }
    }catch(error){
       return res.status(400).send({success:false,message:"Product Details",data:send_Data})
    }
}

const searchproduct = async(req, res)=>{
try{
  const search = req.body.search;
 const product_data = await Product.find({"name":{$regex:".*"+search+".*",$options:'i'}});
 if(product_data.length>0){
  return res.status(200).send({success:true,message:"Product Details", data:product_data}) 
 }else{
  return res.status(200).send({success:true,message:"Product Not Found"}) 
 }

}catch(error){
  return res.status(400).send({success:false,message:error.message})
}
}

module.exports={
    add_product,
    getProducts,
    searchproduct
}