const  validarCampos  = require('../middlewares/validar-campos')
const  validarJWT  = require('../middlewares/validar-jwt');
const multiRol  = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...multiRol,
}
