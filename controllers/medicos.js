//se utiliza ese response para poder tener la opcion status, que se usa en el try y tambien en el catch
const {response}= require('express');
const { existencia } = require('../helpers/existenciaDataDb');

const Medico= require('../models/medico')

const getMedicos= async (req,res=response)=>{

    const medicos=await Medico.find().populate('usuario').populate('hospital');

    res.json({
        ok:true,
        msg:'getMedicos',
        medicos
    })
}

const getMedicoById=async (req,res=response)=>{

    res.json({
        ok:true,
        msg:'getMedicoById'
    })
}



const crearMedico= async (req,res=response)=>{


    const uid=req.uid;
    const hospital=req.body.hospital;

    const medico=new Medico({

    //con el spread operator ...req.body se desestructura toda la data del body 
    //implicitamente trae nombre,hospital
    usuario:uid,...req.body
    })


    try {

      const existeHospitalId= await existencia(hospital,"hospital");

      if(existeHospitalId){

            const medicoDB= await medico.save()

            res.json({
                ok:true,
                msg:'crearMedico',
                medico:medicoDB
            })

      }else{

        res.status(404).json({
            ok:false,
            msj:'No se puede crear un medico, debido a que el Hospital ingresado no existe'
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

const actualizarMedico=(req,res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarMedico'
    })
}


const borrarMedico=(req,res=response)=>{

    res.json({
        ok:true,
        msg:'borrarMedico'
    })
}

module.exports={
   getMedicos,
   getMedicoById,
   crearMedico,
   actualizarMedico,
   borrarMedico
}