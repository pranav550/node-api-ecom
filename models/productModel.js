const mongoose =  require("mongoose");

const productSchema = mongoose.Schema({
    vendor_id:{type:String,required:true},
    store_id:{type:String,required:true},
    name:{type:String,required:true,lowercase: true, trim: true},
    price:{type:String,required:true},
    discount:{type:String,required:true},
    category_id:{type:String,required:true},
    sub_cat_id:{type:String,required:true},
    images:{type:Array,required:true,
    validate:[arrayLimit,'Not more then 5 images']
    },
})

function arrayLimit(val){
   return val.length <= 5;
}

module.exports = mongoose.model("Product", productSchema);