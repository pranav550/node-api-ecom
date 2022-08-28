const Category = require("../models/categoryModel")
const addCategory = async(req,res)=>{
    try{
       const is_category = await Category.find();
       console.log(is_category)
       if(is_category.length>0){
        let checking=false;
        for(let i=0;i<is_category.length>0;i++){
            if(is_category[i]['category'].toLowerCase()===req.body.category.toLowerCase()){
                checking=true;
                break;
            }
        }

        if(checking==false){
            const category = new Category({
                category:req.body.category
               })
               const categoryResult = await category.save();
               res.status(200).send({success:true,message:"category added", data:categoryResult})
        }else{
            res.status(200).send({success:true,message:"this category is already exist"})
        }
       }else{
        const category = new Category({
            category:req.body.category
           })
          
           const categoryResult = await category.save();
           res.status(200).send({success:true,message:"category added", data:categoryResult})
       }
    }catch(error){
        res.status(400).send({success:false,message:error.message})
    }
}

module.exports = {
    addCategory
}