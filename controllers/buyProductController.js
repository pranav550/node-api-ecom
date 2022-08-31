const BuyProduct = require("../models/buyProductModel");

const buy_product = async (req, res)=>{
    try{
        const buyProduct_obj= new BuyProduct({
            product_id:req.body.product_id,
            transaction_id:req.body.transaction_id,
            vendor_id:req.body.vendor_id,
            store_id:req.body.store_id,
            customer_id:req.body.customer_id
        })
        const buyProduct_data = await buyProduct_obj.save();
        res.status(200).send({success:true,message:"Buy Product details", data:buyProduct_data}) 

    }catch(error){
        res.status(400).send({success:false,message:error.message})
    }
}

module.exports = {buy_product} 