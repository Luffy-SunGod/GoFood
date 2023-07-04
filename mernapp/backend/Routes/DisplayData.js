const express=require('express');
const app=express(); 
const router=express.Router();
router.post('/foodData',(req,res)=>{
    try{
        // console.log(global.food_item)
        res.send([global.food_item,global.food_cat]);
    }catch(error){
        console.error(error.message);
        res.send("server error");
    }
})
module.exports=router;  