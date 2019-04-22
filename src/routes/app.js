const express = require('express');
const hbs = require('hbs');
const path = require('path');
const body = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

require('../helpers');

const directoriopublico = path.join(__dirname,'../../public');
const dirNode_modules = path.join(__dirname , '../node_modules')

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

app.use(express.static(directoriopublico));

app.use(body.urlencoded({extended:false}));

app.use(require('./index.js'));
/*
mongoose.connect('mongodb://localhost:27017/continua', {useNewUrlParser: true}, (err,resultado) => {

if (err) {
  return console.error(err);
}

console.log('Conectado a la base de datos');
});
*/
app.listen(port, () => {console.log('Escuchando en el puerto:'+port);


  });
