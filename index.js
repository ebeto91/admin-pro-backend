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

//Lectura y paerseo del body, colocar esta linea de condigo siempre, antes deñ codigo de las rutas.
app.use(express.json());

//base de datos
dbConnection();

//Directorio Publico
//Middleware
app.use(express.static('public'));



//Rutas
//Middleware dentro de rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/uploads',require('./routes/uploads'))


app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto '+process.env.PORT)
})