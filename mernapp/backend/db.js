const mongoose=require('mongoose');
const url='mongodb://127.0.0.1:27017/gofood'
const mongoDb=async ()=>{ 
     await mongoose.connect(url,{
       useNewUrlParser:true,
       useUnifiedTopology:true
   })
}
const main=async ()=>{
     await mongoose.connect(url)
    const {db} =  mongoose.connection;
    const data= await  db.collection('food_item').find().toArray()
    const catdata=await db.collection('foodCategory').find().toArray()
    global.food_item=data;
    global.food_cat=catdata;
}
main(); 
module.exports=mongoDb 
