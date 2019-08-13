const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store); //id do usuario q recebe o like
routes.post('/devs/:devId/dislikes', DislikeController.store); //id do usuario q recebe o dislike


module.exports = routes;