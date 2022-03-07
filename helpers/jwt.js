
const jwt = require('jsonwebtoken');

const generarJWT=(uid,nombre)=>{

    return new Promise((resolve,reject)=>{
 
        const playload={
            uid,
            nombre
        }
    
    jwt.sign(playload,process.env.JWT_SECRET,{
        expiresIn:'12h'
    },(err,token)=>{
        if(err){
            console.log(err);
            reject('No se pudo generar el JWT')
        } else{
            resolve(token);
        }
    });

    });

    
}

module.exports={
    generarJWT
}