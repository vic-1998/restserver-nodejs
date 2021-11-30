const { request, response } = require('express');
const { Product } = require('../models');


const getProduct = async (req, res = response) => {
    // const query = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const estadoActivo = { estado: true };

    //destruturacion de arreglos 
    const [total, product] = await Promise.all([
        Product.countDocuments(estadoActivo),
        Product.find(estadoActivo)
            .populate('user', 'nombre')
            .populate('category', 'name')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.status(200).json({
        total,
        product,
    });
}

const getProductById = async (req = request, res = response) => {

    const idProduct = req.params.id;
    console.log(idProduct)

    const product = await Product.findById(idProduct)
        .populate('user', 'nombre')
        .populate('category', 'name');

    res.json({
        msg: 'Producto por ID.',
        product
    })
}

const createProduct = async (req, res = response) => {

    const { estado, user, ...prouctData } = req.body;

    const productDB = await Product.findOne({ name: prouctData.name });

    if (productDB) {
        return res.status(400).json({
            msg: `El Producto ${productDB.name} ya existe.`
        })
    }
    //generar la data a guardar
    const data = {
        ...prouctData,
        name: prouctData.name.toUpperCase(),
        user: req.user._id
    }
    const product = new Product(data);
    //guardar en Db
    await product.save();

    res.status(201).json({
        msg: 'Producto Creado correctamente.',
        product
    })
}

const updateProduct = async (req = request, res = response) => {

    const idProduct = req.params.id;
    
    const { estado, user, ...product } = req.body;
    
    if (product.name) {
        product.name = product.name.toUpperCase();
    }

    product.user = req.user._id;

    const upProduct = await Product.findByIdAndUpdate(idProduct, product, { new: true });

    res.json({
        msg: 'Producto Actualizado correctamente.',
        upProduct
    })
}

const deleteProduct = async (req = request, res = response) => {

    const idProduct = req.params.id;

    const product = await Product.findByIdAndUpdate(idProduct, { estado: false }, { new: true });

    res.status(200).json({
        msg: 'Producto eliminado correctamente.',
        product
    })
}

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
