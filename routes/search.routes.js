const { Router } = require('express');
const { searchDB } = require('../controllers/search.controller');


const router = Router();

router.get('/:coleccion/:termino',
    searchDB
);

module.exports = router;
