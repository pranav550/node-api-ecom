const SubCategory = require("../models/subcategoryModel");

const create_subcategory = async(req,res)=>{
try{
   const check_sub = await SubCategory.find({ category_id:req.body.category_id});
   if(check_sub.length>0){
    let checking = false;
    for(let i=0;i<check_sub.length; i++){
        if(check_sub[i]['sub_category'].toLowerCase()===req.body.sub_category.toLowerCase()){
            checking=true
            break
        }
    }

    if(checking){
        res.status(200).send({success:false,message:"Subcategory Already Created" }) 
    }else{
        const subCategoryNew = new SubCategory({
            category_id:req.body.category_id,
            sub_category:req.body.sub_category,
        })
    
       const subCategoryData = await subCategoryNew.save();
       res.status(200).send({success:true,message:"Subcategory created", data:subCategoryData })    
    }

   }else{
    const subCategoryNew = new SubCategory({
        category_id:req.body.category_id,
        sub_category:req.body.sub_category,
    })

   const subCategoryData = await subCategoryNew.save();
   res.status(200).send({success:true,message:"Subcategory created", data:subCategoryData })  
   }



   

}catch(error){
  return res.status(400).send({success:false,message:error.message})
}



}

module.exports = {
    create_subcategory
}