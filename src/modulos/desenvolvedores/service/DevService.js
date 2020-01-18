const axios = require('axios');
const Dev = require('../models/Dev');
const devRepository = require('../repository/DevRepository');

module.exports = {

    /**
     * Método responsável  por salvar o dev no banco de dados.
     * @param {*} requestDEV 
     */
    async create(requestDEV) {

        // verifica se já existe um dev salvo na base com o usuario do github
        let retorno = await devRepository.findOne({ github_username: requestDEV.github_username });

        if(!retorno) {
            const retornoGitHub = await this.buscarUsuarioGitHub(requestDEV.github_username);
            const devToSave = await this.montaObjetoParaSalvar(requestDEV, retornoGitHub);
            retorno = await devRepository.create(devToSave);
        }

        return retorno;
    },

    /**
     * Método responsável por preencher o model de DEV, para ser persistido no banco.
     * @param {*} objeto 
     * @param {*} responseGitHub 
     */
    montaObjetoParaSalvar(objeto, responseGitHub) {
        const retorno = new Dev();
        retorno.techs = objeto.techs.split(',').map(tech => tech.trim());
        retorno.nome = responseGitHub.name;
        retorno.github_username = objeto.github_username;
        retorno.avatar_url = responseGitHub.avatar_url;
        retorno.bio = responseGitHub.bio;
        retorno.localizacao = {
            type: 'Point',
            coordinates: [objeto.longitude, objeto.latitude]
        }
        return retorno;
    },

    /**
     * Método responsável por chamar a api do github para buscar os dados do usuário.
     * @param {*} github_username 
     */
    buscarUsuarioGitHub(github_username){
        return axios.get(`https://api.github.com/users/${github_username}`);
    }
};