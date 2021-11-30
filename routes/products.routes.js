const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares');
const { getProduct, createProduct, getProductById, deleteProduct, updateProduct } = require('../controllers/products.controller');
const { validProductId, validCategoryId } = require('../helpers/db-validators');


const router = Router();

router.get('/', getProduct);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validProductId),
    validarCampos
],
    getProductById
)

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('category', 'No es un ID valido').isMongoId(),
    check('category').custom(validCategoryId),
    validarCampos
],
    createProduct
)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validProductId),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validarCampos
],
    updateProduct
)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validProductId),
    validarCampos
],
    deleteProduct
)

module.exports = router;
