const mongoose =require('mongoose');
const {Schema}=mongoose;

const orderModel=new Schema({
    email:{
        type:String,
        required:true,
    },
    order_data:{
        type:Array,
        required:true
    } 

},{timestamps:true})

const Order=mongoose.model('Order',orderModel);

module.exports=Order;
