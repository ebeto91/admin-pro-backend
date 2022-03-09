//se utiliza ese response para poder tener la opcion status, que se usa en el try y tambien en el catch
const {response}= require('express');

const Hospitales = require('../models/hospital');

const getHospitales= async (req,res=response)=>{

    //Esta linea tambien sirve
    //const hospitales= await Hospitales.find({},'nombre usuario')
    
    //el populate sirve para taer info del modelo asociado a hospital que es usuario
    const hospitales= await Hospitales.find().populate('usuario', 'nombre img');


    res.json({
        ok:true,
        msg:'getHospitales',
        hospitales
    })
}

const getHospitalById=(req,res=response)=>{

    res.json({
        ok:true,
        msg:'getHospitalById'
    })
}



const crearHospital= async (req,res=response)=>{

    
    //el uid,nombre vienen del validar-jwt.js
    const uid=req.uid;
    const nombre=req.nombre;

    const hospital= new Hospitales({
       usuario:uid,...req.body
    });

    try {
       
       

         const hospitalDB=await hospital.save();

        res.json({
            ok:true,
            msg:'crearHospital',
            hospital:hospitalDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }


   
}

const actualizarHospital=(req,res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarHospital'
    })
}


const borrarHospital=(req,res=response)=>{

    res.json({
        ok:true,
        msg:'borrarHospital'
    })
}

module.exports={
    getHospitales,
    getHospitalById,
    crearHospital,
    actualizarHospital,
    borrarHospital
}