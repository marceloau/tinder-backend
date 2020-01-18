const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async buscar(){
        
    }

    async store(request, response) {
        const requestDEV  = request.body;
        const existeDev = await Dev.findOne({ github_username: requestDEV.github_username });
        let retorno = null;
        if(!existeDev) {
            const retornoGitHub = await axios.get(`https://api.github.com/users/${requestDEV.github_username}`);
            devToSave = new Dev();
            devToSave.techs = requestDEV.techs.split(',').map(tech => tech.trim());
            devToSave.nome = retornoGitHub.data.name;
            devToSave.github_username = requestDEV.github_username;
            devToSave.avatar_url = retornoGitHub.data.avatar_url;
            devToSave.bio = retornoGitHub.data.bio;
            devToSave.localizacao = {
                type: 'Point',
                coordinates: [requestDEV.longitude, requestDEV.latitude]
            }

            console.log(devToSave);
            retorno = await Dev.create(devToSave);
        } else {
            retorno = existeDev;
        }
        return response.json(retorno);
    }
};