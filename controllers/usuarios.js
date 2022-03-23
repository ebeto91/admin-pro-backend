//se utiliza ese response para poder tener la opcion status, que se usa en el try y tambien en el catch
const {response}= require('express');
const bcrypt= require('bcryptjs');

const mongoose = require('mongoose');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


//CRUD

//Listar Todos
const getUsuarios= async (req,res)=>{

    //Paginacion inicio
    const desde=Number(req.query.desde)||0;
    //Esto es un filtro
    //{}, 'los campos que se desean mostrar'
   /* const usuarios= await Usuario
                                 .find({},'nombre email role google password')
                                 .skip(desde)
                                 .limit(5);
   */

     //const totalUsuarios=await Usuario.count(); 
     
    

    //se utilza la promesa para que el listar todo y el count se ejecuten al mismo timepo
    //se implementa desestructuracio de arreglo y objetos de js, para asignar cada resultado a las 
    //variables [usuarios, totalUsuarios]
    //Link:https://www.freecodecamp.org/espanol/news/desestructuracion-de-arreglos-y-objetos-en-javascript/

    const [usuarios, totalUsuarios]= await Promise.all([

        //primera promesa
        Usuario
        .find({},'nombre email role google img password')
        .skip(desde)
        .limit(5),

        //seguda promesa
        Usuario.countDocuments()

    ])
     

    res.json({
        ok:true,
        usuarios,
        //data que viene del middleware validar-jwt.js
        uid:req.uid,
        nombre:req.nombre,
        totalUsuarios
    });
}


//Listar un usuario por id
const getUsuarioById= async(req,res=response)=>{

    try {

        const uid= req.params.id;

        //Este if es para controlar que _id tenga la longitud o formato correcto que necesita mongoDB
        if(!mongoose.Types.ObjectId.isValid(uid)){
            return res.status(400).json({
                ok:false,
                msg:'ID con formato incorrecto'
            })
        }

        const usuarioDB = await Usuario.findById(uid,['nombre', 'email', 'role' ,'google']);
        if(usuarioDB){
            return res.json({
                ok:true,
                usuario:usuarioDB,
                msj:'Usuario Encontrado'
            })
        }else{
            return res.json({
                ok:false,
                msj:'El usuario no se pudo encontrar'
            }) 
        }


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msj:'Error Inesperado'
        })
    }


}



const crearUsuario= async (req,res= response)=>{

    const {email,password,nombre}=req.body;

    try{

     const existeEmail=  await Usuario.findOne({email});

     if(existeEmail){
         return res.status(400).json({
             ok:false,
             msg:'El correo ya esta registrado'
         })
     }

     const usuario= new Usuario(req.body);

     //Encriptar Contraseña

     const salt = bcrypt.genSaltSync();
     usuario.password=bcrypt.hashSync(password,salt);

     //Guardar Usuario
     await usuario.save();

     const token= await generarJWT(usuario.id,usuario.nombre)

    res.json({
        ok:true,
        usuario:usuario,
        token
    });

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado... revisar logs'
        });

    }
 
}


const actualizarUsuario=async (req,res=response)=>{

    //obtener el id que viene por parametro
    const uid=req.params.id
   
    

    try {

        //Este if es para controlar que _id tenga la longitud o formato correcto que necesita mongoDB
        if(!mongoose.Types.ObjectId.isValid(uid)){
            return res.status(400).json({
                ok:false,
                msg:'ID con formato incorrecto'
            })
        }


        const usuarioDB= await Usuario.findById(uid);
        console.log(usuarioDB)
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con es id'
            });
        }


        //si el usuario existe pasa lo siguiente actualizar
        //se desestructura el req.body con ..., se extraen independientemnete password google, email ahora
        //...campos no tiene password google, email
        const {password,google,email,role,...campos}= req.body;

        if(usuarioDB.email!==email) {
           
            const existeEmail= await Usuario.findOne({email});
           if(existeEmail){
               return res.status(400).json({
                   ok:false,
                   msg:'Ya existe un usuario con ese email'
               })
           }
            
        }
       
         //Si no se loguea con cuenta de google se puede actualizar el corre, es decir si google es false.
         if(!usuarioDB.google){
            campos.email=email
         }
         //entra al if si la persona esta logueada con google y cambio el correo,Nota: hay una regla,
         //no se puede editar el correo si la persona se loguea con la cuenta de google.
         //Nota : igual en el front end en el perfil.component.html en el input email hay un readOnly,
         //si la persona se loguea con gmail.
         else if(usuarioDB.email !==email){
             return res.status(400).json({
                 ok:false,
                 msg:'Usuario de google no puede cambiar su correo'
             })
         }
        
         campos.role=role
        

        //El delete se usa para quitar campos que no se quieren actualizar, enviar las variables que
        //se desean actualizar
       // delete campos.password;
        //delete campos.google;


        //{new:true} => para devolver el usuarioActualizado que la info sea persistente
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok:true,
            usuario:usuarioActualizado
        })



        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })

    }

}

const borrarUsuario=async(req,res=response)=>{

    try {

        const uid=req.params.id
        
        //Este if es para controlar que _id tenga la longitud o formato correcto que necesita mongoDB
        if(!mongoose.Types.ObjectId.isValid(uid)){
            return res.status(400).json({
                ok:false,
                msg:'ID con formato incorrecto'
            })
        }

            
        const usuarioDB= await Usuario.findById(uid)

        if(usuarioDB){
            const resul= await Usuario.deleteOne(usuarioDB)
            if(resul.deletedCount>0){
                res.json({
                    ok:true,
                    resultado:resul,
                    msj:'Usuario eliminado con exito'
                })
            } 
            else{
                res.json({
                    ok:false,
                    msj:'Usuario no fue eliminado'
                })
            }  

        }else{
            res.json({
                ok:true,
                msj:'El usuario no se encrontro en la DB'
            })
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msj:'Error Inesperado'
        })
    }

}


module.exports={
    getUsuarios,
    getUsuarioById,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}