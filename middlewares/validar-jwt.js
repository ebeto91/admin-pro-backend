const {response}= require('express');
const jwt=require('jsonwebtoken')

const validarJWT=(req,res=response,next)=>{
//Leer Token

const token = req.header('x-token');
console.log(JSON.stringify(token));

if(!token){
    return res.status(401).json({
        ok:false,
        msg:'No hay token en la peticion'
    })
}

try {
    const {uid,nombre}=jwt.verify(token,process.env.JWT_SECRET);

    //para pasar los datos del token(payload) al controller usuario en el metodo:getUsuarios
    req.uid=uid;
    req.nombre=nombre;

    console.log(uid + nombre);

    next();
    
    
} catch (error) {

   //se imprime para conocer el error
   // console.log(error)

    if(error.name === 'TokenExpiredError'){
        return res.status(401).json({
            ok:false,
            msg:'El Token Caduco',
        
        })
    }

    return res.status(401).json({
        ok:false,
        msg:'token incorrecto',
        error
    })
}




}

module.exports={
    validarJWT
}