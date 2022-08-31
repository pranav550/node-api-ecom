const Address = require("../models/addressModel");

const add_address = async(req,res)=>{
    try{
    const address_exist = await Address.findOne({user_id:req.body.user_id});
    console.log(address_exist)
    if(address_exist){
        const addressArray = [];
        
        for(let i=0; i<address_exist.address.length;i++){
            addressArray.push(address_exist.address[i])
        }
        addressArray.push(req.body.address);
        const updated_data = await Address.findOneAndUpdate(
            {user_id:req.body.user_id},
            {$set:{address:addressArray}},
            {returnDocument:"after"}
            ); 
        res.status(200).send({success:true,message:"Address Details",data:updated_data})
    }else{
        const address =new Address({
            user_id:req.body.user_id,
            address:req.body.address
        })
        console.log(address)
        const address_data = await address.save();
        res.status(200).send({success:true,message:"Address Details",data:address_data})
    }

       
    }catch(error){
        res.status(400).send({success:false,message:error.message,data:address_data})
    }
}

module.exports = {
    add_address
}