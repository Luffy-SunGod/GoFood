const express=require('express');
const app=express(); 

const router=express.Router();
app.use(express.json())
const user=require('../models/User');
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secret="Iampiyushpandey"
router.post("/createuser",
[
body('name').isLength({min:5}),
body('email','invalid email').isEmail(),
body('password').isLength({ min:5 })
]
,async(req,res)=>{
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        const salt= await bcrypt.genSalt(10)
        let secpassword=await bcrypt.hash(req.body.password,salt);
        try {
            await user.create({
            name:req.body.name,
            password:secpassword,
            email:req.body.email,
            location:req.body.location,
          }).then(res.json({success:true}));
    }
    catch (error) {
        console.log(error);
        res.json({success:false});
    }
}
})  

router.post("/login",async(req,res)=>{
        let email=req.body.email
        let data=req.body
        console.log(data);
        try {
            let username=await user.findOne({email})
            console.log(username);
            if(!username)return res.status(400).json({ errors: "Invalid email" });    
            let result= await bcrypt.compare(req.body.password,username.password)
            console.log(result);
            //  result=result||bcrypt.compare(req.body.email,username.password)
            if(!result)return res.status(400).json({ errors: "Invalid email" });
            const data={
                user:{
                    id:username.id
                }
            }
            const authToken=jwt.sign(data,secret)
            return res.json({success:true,authToken:authToken});
        }
    catch (error) {
        console.log(error);
        res.json({success:false});
    }
})  



module.exports=router;