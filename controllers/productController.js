const Product = require("../models/productModel");

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

module.exports={
    add_product
}