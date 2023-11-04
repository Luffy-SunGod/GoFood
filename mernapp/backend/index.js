// const { json } = require('body-parser');
const express=require('express');
const app=express();
const mongodb=require('./db')
var cors = require('cors')
mongodb()
app.use(express.urlencoded())
app.use(cors())
const port =5000

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello Prashant Pandey ")
})

app.use('/api',require("./Routes/Createuser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})
