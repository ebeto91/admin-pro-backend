/*
ruta: '/api/hospitales'
*/

const {Router} = require('express');
const {check}= require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const {getHospitales,getHospitalById,crearHospital,actualizarHospital,borrarHospital}= require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Retorna todos los usuarios
router.get('/',getHospitales);

//Retornar un usuario por ID
router.get('/:id',getHospitalById)

//Crear un usuario
//parametros post(path,middleware para colocar varios tienen que ir como arreglo,controlador)
router.post('/',
    [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
     //este es el middleware personalizado
     validarCampos
    ]
    ,crearHospital
);

router.put('/:id',
    [
   
    ]
    ,actualizarHospital
);

router.delete('/:id',borrarHospital)




module.exports=router;