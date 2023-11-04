const express=require('express')
const Order =require('../models/Order')

const router=express.Router();

router.post('/OrderData', async (req,res)=>{
    let data=req.body.order_data;
    // console.log(data)
    let eId=await Order.findOne({'email':req.body.email});
    if(eId==null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data],
            }).then(()=>{
                 res.json({success:true});
            })
        } catch (error) {
            console.log(error);
             res.send("server error",error.msg);
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}).then(()=>{
                        
                }).then(()=>{
                     res.json({success:true})
                })
        } catch (error) {
            console.log(error);
            res.send("server error",error.msg)
        }
        }
    })




// if (eId===null) {
//     try {
//         await Order.create({
//             email: req.body.email,
//             order_data:[data]
//         }).then(() => {
//             res.json({ success: true })
//         })
//     } catch (error) {
//         console.log(error.message)
//         res.send("Server Error", error.message)

//     }
// }

// else {
//     try {
//         await Order.findOneAndUpdate({email:req.body.email},
//             { $push:{order_data: data} }).then(() => {
//                 res.json({ success: true })
//             })
//     } catch (error) {
//         console.log(error.message)
//         res.send("Server Error", error.message)
//     }
// }
// })

module.exports=router;
