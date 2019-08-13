const express = require('express');    //faz as rotas
const mongoose = require('mongoose');  //transforma linguagem js em sql
const cors = require('cors'); //permitir o acesso do front
const routes = require('./routes');
const server = express();

//conexao com o mongodb
mongoose.connect('mongodb+srv://Thay:1234@cluster0-skznw.mongodb.net/omnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(3333);