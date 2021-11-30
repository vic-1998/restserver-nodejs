const Category = require('../models/category');
const Role = require('../models/role');
const User = require('../models/user');
const Product = require('../models/product');

const rolValido = async (rol = '') => {
    const exiteRole = await Role.findOne({ rol });
    if (!exiteRole) {
        throw new Error(`El rol ${rol} no esta resgistrado en la Base de datos.`)
    }
}

const exiteUserId = async (id) => {
    const existeUser = await User.findById(id)
    if (!existeUser) {
        throw new Error(`El id: ${id} no existe.`)
    }
}

//verificar el correo del
const existeEmail = async (correo = '') => {

    const emailExiste = await User.findOne({ correo })
    if (emailExiste) {
        throw new Error(`El correo: ${correo} ya esta resgistrado.`)
    }
}

//validar categorias por id
const validCategoryId = async (id) => {
    const categoryId = await Category.findById(id)
    if (!categoryId) {
        throw new Error(`El id: ${id} no existe.`)
    }
}

const validProductId = async (id) => {
    const productId = await Product.findById(id)
    if (!productId) {
        throw new Error(`El id: ${id} no existe.`)
    }
}


module.exports = {
    rolValido,
    existeEmail,
    exiteUserId,
    validCategoryId,
    validProductId
}
