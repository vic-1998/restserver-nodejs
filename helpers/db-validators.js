const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    rolValido,
    existeEmail,
    exiteUserId
}
