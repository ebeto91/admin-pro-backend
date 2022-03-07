const {response}=require('express');
const Usuario = require('../models/usuario');
const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req,res=response)=>{

    const{email,password}=req.body;

    try {
        
       //verificar email
       const usuarioDB=await Usuario.findOne({email});
       if(!usuarioDB){
           return res.status(404).json({
            ok:false,
            msg:'Email o contraseña no valido'
           })
         
       }

       console.log(usuarioDB.password)

       //si llega a este punto verificar contraseña
       const validPassword= bcrypt.compareSync(password,usuarioDB.password);
       if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Email o contraseña no valido'
           })
       }


       //si llega a este punto generar un token.
       const token=await generarJWT(usuarioDB.id,usuarioDB.nombre);


        res.json({
            ok:true,
            msg:'Hola',
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }
}

module.exports={
    login
}