const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const {
    Category,
    User,
    Product } = require('../models')

const coleccionesPermitidas = [
    'users',
    'category',
    'product',
    'role'
]

const searchUser = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const user = await User.findById(termino);
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const users = await User.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: users
    });
}

const searchCategories = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const category = await Category.findById(termino);
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const categories = await Category.find({
        $or: [{ name: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: categories
    });

}

const searchProdut = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const product = await Product.findById(termino);
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const products = await Product.find({ name: regex, estado: true })
        .populate('category', 'name');

    res.json({
        results: products
    });
}

const searchDB = async (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permiridas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'users':
            searchUser(termino, res);
            break;
        case 'category':
            searchCategories(termino, res);
            break;
        case 'product':
            searchProdut(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Busqueda no encontrada.'
            })
    }
}

module.exports = {
    searchDB
}
