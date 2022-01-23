const express = require('express')
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller');

/* @description Root Route
    @method GET */

route.get('/',services.homeRoutes);

/* @description add_product
    @method GET */
route.get('/add-product',services.add_product);

/* @description update_product
    @method GET */
route.get('/update-product',services.update_product);


//API

route.post('/api/products',controller.create);
route.get('/api/products',controller.find);
route.put('/api/products/:id',controller.update);
route.delete('/api/products/:id',controller.delete);

module.exports = route