const express=require('express');
require('dotenv').config();
const {dbConnection}=require('./database/config');
//credenciales mongoDB
//user:ebeto28
//clave:neily12345

//cors
const cors=require('cors');

//servidor express
const app=express();
app.use(cors());

//base de datos
dbConnection();

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'hola mundo'
    })
})

app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto'+process.env.PORT)
})