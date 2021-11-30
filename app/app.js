const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        //pueto de la aplicacion
        this.port = port;
        //api router path
        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            category: '/api/category',
            product: '/api/product',
            search: '/api/search'
        };
        // Conectar a base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();
        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //parseo y lectura del body
        this.app.use(express.json());

        //Directoria publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.user, require('../routes/user.routes'));
        this.app.use(this.paths.category, require('../routes/category.routes'));
        this.app.use(this.paths.product, require('../routes/products.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo en puerto: localhost:${this.port}`);
        });
    }
}

module.exports = Server;
