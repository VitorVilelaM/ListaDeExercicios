const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const bodyParse = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', expressHandlebars.engine());

app.set('view engine', 'handlebars');

app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('home', {
        tituloPagina: 'Lista de Exercícios 1:'
    });
});

app.get('/ex1', function (req, res) {
    res.render('ex1', {
        tituloPagina: 'Exercício 1'
    });
});

app.post('/ex1', function (req, res) {
    let numero = parseInt(req.body.numero);

    let dadosRender = {
        num: '',
        mensagem: ''
    };

    if (numero > 0) {
        dadosRender.mensagem = "Positivo";
        dadosRender.num = numero;
    }
    else if (numero < 0) {
        dadosRender.mensagem = "Negativo";
        dadosRender.num = numero;
    }
    else {
        dadosRender.mensagem = "0 (Zero)";
        dadosRender.num = numero;
    }

    console.log(dadosRender);
    res.render('ex1', dadosRender);
})

app.get('/ex2', function (req, res) {

    let tabuada = req.query.tabuada;

    let valores = {
        num: tabuada,
        tab: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mults: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        resposta: false
    };

    for(let i; i > 10; i++){
        valores.tab[i] = num * valores.mults[i];
    }

    valores.resposta = true;

    console.log(valores.num);
    res.render('ex2', valores);
});



app.listen(PORT, function () {
    console.log("Server rodando na porta 3000");
})
