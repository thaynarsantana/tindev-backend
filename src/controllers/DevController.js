const axios = require('axios'); //pacote para importar apis externas
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {   //listagem
        const {user} = req.headers;
        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({  //esse find pra procurar em objetos
            $and: [                     //and do mongo
                {_id: {$ne: user}},                  //not equal ao proprio user
                {_id: {$nin: loggedDev.likes}},      //not in os likes do user
                {_id: {$nin: loggedDev.dislikes}},   //not in os deslikes do user
            ]
        });
        return res.json(users);
    },

    async store(req, res) { //funcao assincrona
        const {username} = req.body;

        //verificar se nao ja existe esse usuario no banco
        const userExists = await Dev.findOne({user: username});
        if (userExists) {
            return res.json(userExists);
        }

        //chama a api do github
        const response = await axios.get(`https://api.github.com/users/${username}`); //await obriga o node a esperar essa funcao antes de continuar pra proxima linha
        //pega as informações
        const {name, bio, avatar_url: avatar} = response.data; //desestruturação do js e renomeação da variavel
        //coloca nas variaveis (de para)
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });
        return res.json(dev);
    }
};