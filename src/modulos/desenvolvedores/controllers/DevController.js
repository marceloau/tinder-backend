
const devService = require('../service/DevService');

module.exports = {
    async create(request, response) {
        const retorno = await devService.create(request.body);
        return response.json(retorno);
    }
};