const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {
        type: String,
    },
    dispinible: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, estado, ...product } = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);
