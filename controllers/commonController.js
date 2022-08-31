const Product = require("../models/productModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subcategoryModel");

const data_count = async(req,res)=>{
    try{
    const count_data =[];
    const product_data = await Product.find().count();
    const vendor_data = await User.find({type:1}).count();
    const category_data = await Category.find().count();
    const sub_category_data = await SubCategory.find().count();

    count_data.push({
        product:product_data,
        vendor:vendor_data,
        category:category_data,
        sub_category:sub_category_data
    })

    res.status(200).send({success:true, message:"Counting Data", data:count_data })
    
    }catch(error){
    res.status(400).send({succcess:false,message:error.message})
    }

}

module.exports = {
    data_count
}