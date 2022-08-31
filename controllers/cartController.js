const Cart = require("../models/cartModel");

const add_to_cart = async(req, res)=>{
   try{
    const cart_obj = new Cart({
        product_id:req.body.product_id,
        price:req.body.price,
        vendor_id:req.body.vendor_id,
        store_id:req.body.store_id
        })
        const cart_data = await cart_obj.save();
        res.status(200).send({success:true, message:"Product details", data:cart_obj})   
   }catch(error){
     res.status(400).send({success:false, message:error.message})
   }
}

module.exports ={
    add_to_cart
}