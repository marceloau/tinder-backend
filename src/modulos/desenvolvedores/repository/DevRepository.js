const Dev = require('../models/Dev');

module.exports = {
    async create(dev) {
        let retorno = null;
        if(dev){
            retorno = await Dev.create(dev);
        }
        return retorno;
    },

    async findOne(dev) {
        return await Dev.findOne(dev);
    }
};