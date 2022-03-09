/*
ruta: '/api/medicos'
*/

const {Router} = require('express');
const {check}= require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const {getMedicos,getMedicoById,crearMedico,actualizarMedico,borrarMedico}= require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
/*
Ruta: /api/medicos
*/



//Retorna todos los medicos
router.get('/',getMedicos);

//Retornar un medico por ID
router.get('/:id',getMedicoById)

//Crear un medico
//parametros post(path,middleware para colocar varios tienen que ir como arreglo,controlador)
router.post('/',
    [
    validarJWT,
    check('nombre','El nombre del medico es necesario').not().isEmpty(), 
    check('hospital','El id del hospital tiene que ser valido').isMongoId(), 
    //este es el middleware personalizado
    validarCampos
    ]
    ,crearMedico
);

router.put('/:id',
    [
   
    ]
    ,actualizarMedico
);

router.delete('/:id',borrarMedico)




module.exports=router;