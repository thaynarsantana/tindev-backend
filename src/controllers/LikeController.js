const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const {user} = req.headers;  //id de qm deu like
        const {devId} = req.params;  //id de quem recebeu o like

        //procurar esses ids no banco
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        //verificar se o usuario q recebeu id existe
        if (!targetDev) {
            return res.status(400).json({error: 'Dev not exists'}) //error 400 numero padrao para usuario digitou algo errado
        }

        //verificar se deu match
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH');
        }

        //guardar o id q recebeu like no array de qm deu like
        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();


        return res.json({loggedDev});
    }
};