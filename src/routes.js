const { Router } = require('express');
const DevController = require('./modulos/desenvolvedores/controllers/DevController');

const routesDEV = new Router();

routesDEV.post('/devs', DevController.create);

module.exports = routesDEV;