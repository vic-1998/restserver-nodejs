const { request, response } = require('express');
const { Category } = require('../models/index');

const getCategoryRoute = async (req = request, res = response) => {
    // const query = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const estadoActivo = { estado: true };

    //destruturacion de arreglos 
    const [total, category] = await Promise.all([
        Category.countDocuments(estadoActivo),
        Category.find(estadoActivo)
            .populate('user', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        category,
    });
}

const getCategoryByIdRoute = async (req = request, res = response) => {

    const idCategory = req.params.id;

    const category = await Category.findById(idCategory)
        .populate('user', 'nombre');

    res.json({
        msg: 'Category by Id',
        category
    })
}

const createCategoryRoute = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe.`
        })
    }
    //generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }
    const category = new Category(data);
    //guardar en Db
    await category.save();

    res.status(201).json({
        msg: 'Categoria Creada correctamente.',
        category
    })
}

const updateCategoryRoute = async (req = request, res = response) => {

    const idCategory = req.params.id;

    const { estado, user, ...category } = req.body;

    category.name = category.name.toUpperCase();
    category.user = req.user._id;

    const data = await Category.findByIdAndUpdate(idCategory, category, { new: true });

    res.json({
        msg: 'Update Category',
        data
    })
}

const deleteCategoryRoute = async (req = request, res = response) => {

    const idCategory = req.params.id;

    const category = await Category.findByIdAndUpdate(idCategory, { estado: false }, { new: true });

    res.status(200).json({
        msg: 'Delete Category',
        category
    })
}

module.exports = {
    getCategoryRoute,
    getCategoryByIdRoute,
    createCategoryRoute,
    updateCategoryRoute,
    deleteCategoryRoute
}
