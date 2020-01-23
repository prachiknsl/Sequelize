import express from 'express';
const app=express();
app.get('/',(req,res)=>
{
    res.send(('Hello'));
});
console.log("hello");
app.listen(5000,()=>console.log('Server Running'));