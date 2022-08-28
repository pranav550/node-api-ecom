const Store = require("../models/storeModel");
const User =  require("../models/userModel");

const create_Store = async(req,res)=>{
    try{
      const is_exist = await User.find({_id:req.body.vendor_id});
      if(is_exist){
          if(!req.body.latitude || !req.body.longitude){
            res.status(200).send({success:false, message:"lat and log is not found"});    
          }else{
            const vendorData = await Store.findOne({vendor_id:req.body.vendor_id});
            if(vendorData){
                res.status(200).send({success:false, message:"This vendor is already exist"});
            }else{
               const store = new Store({
                vendor_id:req.body.vendor_id,
                logo:req.file.filename,
                bussiness_email:req.body.bussiness_email,
                address:req.body.address,
                pin:req.body.pin,
                location:{
                    type:"Point",
                    coordinates:[parseFloat(req.body.latitude),parseFloat(req.body.longitude)]
                }
              });
               const StoreData = await store.save();
               res.status(200).send({success:false, message:"Store Data", data:StoreData});
            }
          } 

      }else{
        res.status(200).send({success:false, message:"Vendor id does not exist"});
      }   

    }catch(error){
        res.status(400).send({success:false, message:error.message})
    }
}

module.exports = {
     create_Store   
}