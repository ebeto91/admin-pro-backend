const {response}=require('express');
const Usuario = require('../models/usuario');
const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req,res=response)=>{

    const{email,password}=req.body;

    try {
        
       //verificar email
       const usuarioDB=await Usuario.findOne({email});
       if(!usuarioDB){
           return res.status(401).json({
            ok:false,
            msg:'Email o contraseña no valido'
           })
         
       }

       console.log(usuarioDB.password)

       //si llega a este punto verificar contraseña
       const validPassword= bcrypt.compareSync(password,usuarioDB.password);
       if(!validPassword){
        return res.status(401).json({
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


const googleSignIn=async(req,res=response)=>{

    const googleToken=req.body.token;
     
    try {

       const {name,email,picture} = await googleVerify(googleToken);

       console.log(picture)
       //Verificamos si el usuario se habia registrado previamente es otras palabras si existe.
       const usuarioDB=await Usuario.findOne({email});
       let usuario;

       //si no exite se crea un usuario nuevo.
       if(!usuarioDB){
           usuario= new Usuario({
               nombre:name,
               email,
               password:'@@@',
               img:picture,
               google:true

           });
        //si esta pasando de una autentificacion tradicional a la de google  
       }else{
         //existe usuario
         usuario=usuarioDB;
         usuario.google=true;
         usuario.img=picture;
         //si quiere mantener los 2 metodos de login tener comentado.
         //usuario.password='@@@'
       }

       await usuario.save();

        //Nota: el token que vamos a revisar cuando se usa la app de angular es este que creamos nosotros,
        //el token de google, el de google solo usuamos para registrar si el usuario no existe, le 
        //estraemos el correo, nombre y picture del token google.
        //si llega a este punto generar un token.
        const token=await generarJWT(usuario.id,usuario.nombre);

        res.json({
            ok:true,
            msg:'Google SignIn',
            token
        });

        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token incorrecto'
        })
    }
}

const renewToken= async (req,res=response)=>{

const {uid,nombre}= req;

const usuario=await Usuario.findById(uid);

const token= await generarJWT(uid,nombre)

res.json({
    ok:true,
    msg:'token renovado',
    token,
    usuario
    
})
}

module.exports={
    login,
    googleSignIn,
    renewToken
}