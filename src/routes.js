const { Router } = require('express');
const DevController = require('./modulos/desenvolvedores/controllers/DevController');

const routes = new Router();

routes.post('/devs', DevController.create);

module.exports = routesDEV