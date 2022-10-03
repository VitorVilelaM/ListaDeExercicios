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

app.get("/", function (request, response) {
    response.render('home', {
        class: 'index',
        tituloPagina: 'Exercícios Express-Handlebars',
        tituloHeader: 'Exercicios',
        subtituloHeader: 'Escolha o número do exercício'
    });
});

app.get("/1", function (request, response) {
    response.render('1', {
        class: 'ex1',
        tituloPagina: 'Exercício 1 - Express-Handlebars',
        tituloHeader: 'Exercício 1',
        subtituloHeader: 'Insira um número (positivo, negativo ou zero)'
    });
});
app.post("/1", function (request, response) {
    var mensagemTitulo, mensagemTexto, number = request.body.number;

    if (number == "") {
        number = 'Vazio';
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';
    } else {
        mensagemTitulo = 'Resultado';
        if (number == 0) {
            mensagemTexto = '0 (zero)';
        } else if (number > 0) {
            mensagemTexto = 'POSITIVO';
        } else if (number < 0) {
            mensagemTexto = 'NEGATIVO';
        }
    }

    let dadosRender = {
        class: 'ex1',
        tituloPagina: 'Exercício 1 - Express-Handlebars',
        tituloHeader: 'Exercício 1',
        subtituloHeader: 'Insira um número (positivo, negativo ou zero)',
        dadosValidos: true,
        mensagemTitulo: mensagemTitulo,
        mensagemTexto: mensagemTexto
    }

    response.render('1', dadosRender);
});

app.get("/2", function (request, response) {
    response.render('2', {
        class: 'ex2',
        tituloPagina: 'Exercício 2 - Express-Handlebars',
        tituloHeader: 'Exercício 2',
        subtituloHeader: 'Insira um número (tabuada)'
    });
});
app.post("/2", function (request, response) {
    var mensagemTitulo, mensagemTexto, number = request.body.number;
    let dadosRender;

    if (number == "") {
        number = 'Vazio';
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex2',
            tituloPagina: 'Exercício 2 - Express-Handlebars',
            tituloHeader: 'Exercício 2',
            subtituloHeader: 'Insira um número (tabuada)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto,
        }
    } else {
        mensagemTitulo = 'Resultado';
        if (number == 0) {
            mensagemTexto = "O número 0 (zero) multiplicado com qualquer número é sempre 0 (zero)!";

            dadosRender = {
                class: 'ex2',
                tituloPagina: 'Exercício 2 - Express-Handlebars',
                tituloHeader: 'Exercício 2',
                subtituloHeader: 'Insira um número (tabuada)',
                dadosValidos: false,
                dados: true,
                mensagemTitulo: mensagemTitulo,
                mensagemTexto: mensagemTexto,
            }
        } else {
            var mensagemTexto = "";
            var mult = new Array();

            for (i = 0; i < 11; i++) {
                mult.push(number * i);
            }

            dadosRender = {
                class: 'ex2',
                tituloPagina: 'Exercício 2 - Express-Handlebars',
                tituloHeader: 'Exercício 2',
                subtituloHeader: 'Insira um número (tabuada)',
                dadosValidos: true,
                dados: false,
                mensagemTitulo: mensagemTitulo,
                number: number,
                resultado0: mult[0],
                resultado1: mult[1],
                resultado2: mult[2],
                resultado3: mult[3],
                resultado4: mult[4],
                resultado5: mult[5],
                resultado6: mult[6],
                resultado7: mult[7],
                resultado8: mult[8],
                resultado9: mult[9],
                resultado10: mult[10],
            }
        }
    }

    response.render('2', dadosRender);
});

app.get("/3", function (request, response) {
    response.render('3', {
        class: 'ex3',
        tituloPagina: 'Exercício 3 - Express-Handlebars',
        tituloHeader: 'Exercício 3',
        subtituloHeader: 'Insira os números (IMC)'
    });
});
app.post("/3", function (request, response) {
    var mensagemTitulo, mensagemTexto, peso = request.body.peso, altura = request.body.altura;
    let dadosRender;

    if (peso == "" || altura == "") {
        peso = 'Vazio';
        altura = 'Vazio';
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex3',
            tituloPagina: 'Exercício 3 - Express-Handlebars',
            tituloHeader: 'Exercício 3',
            subtituloHeader: 'Insira os números (IMC)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        if (peso == 0 || altura == 0) {
            mensagemTitulo = 'Cuidado!';
            mensagemTexto = 'Insira valores maiores que 0 (zero)!';

            dadosRender = {
                class: 'ex3',
                tituloPagina: 'Exercício 3 - Express-Handlebars',
                tituloHeader: 'Exercício 3',
                subtituloHeader: 'Insira os números (IMC)',
                dadosValidos: false,
                dados: true,
                mensagemTitulo: mensagemTitulo,
                mensagemTexto: mensagemTexto
            }
        } else {
            mensagemTitulo = 'Resultado';
            mensagemTexto = new Array();
            var imc = peso / (altura * altura);

            if (imc < 18.5) {
                mensagemTexto.push("MAGREZA");
                mensagemTexto.push("(menor que 18,5)");
            } else if (imc > 18.5 && imc < 24.9) {
                mensagemTexto.push("NORMAL");
                mensagemTexto.push("(entre 18,5 e 24,9)");
            } else if (imc > 25 && imc < 29.9) {
                mensagemTexto.push("SOBREPESO");
                mensagemTexto.push("(entre 25,0 e 29,9)");
            } else if (imc > 30 && imc < 39.9) {
                mensagemTexto.push("OBESIDADE");
                mensagemTexto.push("(entre 30,0 e 39,9)");
            } else if (imc > 40) {
                mensagemTexto.push("OBESIDADE GRAVE");
                mensagemTexto.push("(maior que 40,0)");
            }

            dadosRender = {
                class: 'ex3',
                tituloPagina: 'Exercício 3 - Express-Handlebars',
                tituloHeader: 'Exercício 3',
                subtituloHeader: 'Insira os números (IMC)',
                dadosValidos: true,
                dados: false,
                mensagemTitulo: mensagemTitulo,
                mensagemClassificacao: mensagemTexto[0],
                mensagemFaixa: mensagemTexto[1]
            }
        }
    }

    response.render('3', dadosRender);
});

app.get("/4", function (request, response) {
    response.render('4', {
        class: 'ex4',
        tituloPagina: 'Exercício 4 - Express-Handlebars',
        tituloHeader: 'Exercício 4',
        subtituloHeader: 'Insira um número (custo consumidor)'
    });
});
app.post("/4", function (request, response) {
    var mensagemTitulo, mensagemTexto, number = request.body.number;
    let dadosRender;

    if (number == "") {
        number = 'Vazio';
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex4',
            tituloPagina: 'Exercício 4 - Express-Handlebars',
            tituloHeader: 'Exercício 4',
            subtituloHeader: 'Insira um número (custo consumidor)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        if (number == 0) {
            mensagemTitulo = 'Cuidado!';
            mensagemTexto = 'Insira valores maiores que 0 (zero)!';

            dadosRender = {
                class: 'ex4',
                tituloPagina: 'Exercício 4 - Express-Handlebars',
                tituloHeader: 'Exercício 4',
                subtituloHeader: 'Insira um número (custo consumidor)',
                dadosValidos: false,
                dados: true,
                mensagemTitulo: mensagemTitulo,
                mensagemTexto: mensagemTexto
            }
        } else {
            mensagemTitulo = 'Resultado';

            var preco = parseFloat(number);
            var total = (preco + (preco * 0.28) + (preco * 0.45)).toFixed(2);

            dadosRender = {
                class: 'ex4',
                tituloPagina: 'Exercício 4 - Express-Handlebars',
                tituloHeader: 'Exercício 4',
                subtituloHeader: 'Insira um número (custo consumidor)',
                dadosValidos: true,
                dados: false,
                mensagemTitulo: mensagemTitulo,
                total: total
            }
        }
    }

    response.render('4', dadosRender);
});

app.get("/5", function (request, response) {
    response.render('5', {
        class: 'ex5',
        tituloPagina: 'Exercício 5 - Express-Handlebars',
        tituloHeader: 'Exercício 5',
        subtituloHeader: 'Insira um número (custo consumidor)'
    });
});
app.post("/5", function (request, response) {
    var mensagemTitulo, mensagemTexto, number = request.body.number, ajuste = request.body.ajuste;
    let dadosRender;

    if (number == "") {
        number = 'Vazio';
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex5',
            tituloPagina: 'Exercício 5 - Express-Handlebars',
            tituloHeader: 'Exercício 5',
            subtituloHeader: 'Insira os números (ajuste salário)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        if (number == 0) {
            mensagemTitulo = 'Cuidado!';
            mensagemTexto = 'Insira valores maiores que 0 (zero)!';

            dadosRender = {
                class: 'ex5',
                tituloPagina: 'Exercício 5 - Express-Handlebars',
                tituloHeader: 'Exercício 5',
                subtituloHeader: 'Insira os números (ajuste salário)',
                dadosValidos: false,
                dados: true,
                mensagemTitulo: mensagemTitulo,
                mensagemTexto: mensagemTexto
            }
        } else {
            mensagemTitulo = 'Resultado';

            var salario = parseFloat(number);
            ajuste = parseFloat(ajuste) / 100;
            var total = (salario + (salario * ajuste)).toFixed(2);

            dadosRender = {
                class: 'ex5',
                tituloPagina: 'Exercício 5 - Express-Handlebars',
                tituloHeader: 'Exercício 5',
                subtituloHeader: 'Insira os números (ajuste salário)',
                dadosValidos: true,
                dados: false,
                mensagemTitulo: mensagemTitulo,
                total: total
            }
        }
    }

    response.render('5', dadosRender);
});

app.get("/6", function (request, response) {
    response.render('6', {
        class: 'ex6',
        tituloPagina: 'Exercício 6 - Express-Handlebars',
        tituloHeader: 'Exercício 6',
        subtituloHeader: 'Insira as notas (aprovado ou reprovado)'
    });
})
app.post("/6", function (request, response) {

    let nota1 = request.body.nota1, nota2 = request.body.nota2, nota3 = request.body.nota3;
    let dadosRender;

    if (nota1 === "" || nota2 === "" || nota3 === "") {
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex6',
            tituloPagina: 'Exercício 6 - Express-Handlebars',
            tituloHeader: 'Exercício 6',
            subtituloHeader: 'Insira as notas (aprovado ou reprovado)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else if (nota1 == 0 && nota2 == 0 && nota3 == 0) {
        mensagemTitulo = 'REPROVADO';
        mensagemTexto = "Infelizmente até você sabia a resposta";

        dadosRender = {
            class: 'ex6',
            tituloPagina: 'Exercício 6 - Express-Handlebars',
            tituloHeader: 'Exercício 6',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        nota1 = parseFloat(nota1);
        nota2 = parseFloat(nota2);
        nota3 = parseFloat(nota3);

        var total = ((nota1 + nota2 + nota3) / 3).toFixed(2);
        let status;
        let emote;
        if (total >= 6) {
            mensagemTexto = 'Parabéns pelo esforço!';
            mensagemTitulo = 'Você foi ';
            status = "APROVADO"
        } else {
            mensagemTexto = 'Infelizmente não foi dessa vez!';
            mensagemTitulo = "Você foi ";
            status = "REPROVADO"
            emote = "&#x1F622";
        }
        console.log(total);

        dadosRender = {
            class: 'ex6',
            tituloPagina: 'Exercício 6 - Express-Handlebars',
            tituloHeader: 'Exercício 6',
            subtituloHeader: 'Insira as notas (aprovado ou reprovado)',
            dadosValidos: true,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto,
            status: status,
            total: total,
            emote: emote
        }
    }

    response.render('6', dadosRender);
})

app.get("/7", function (request, response) {
    response.render('7', {
        class: 'ex7',
        tituloPagina: 'Exercício 7 - Express-Handlebars',
        tituloHeader: 'Exercício 7',
        subtituloHeader: 'Insira os números (horas extras)'
    });
})
app.post("/7", function (request, response) {
    let number = request.body.number, horas = request.body.horas;
    let dadosRender;

    if (number === "" || horas === "") {
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex7',
            tituloPagina: 'Exercício 7 - Express-Handlebars',
            tituloHeader: 'Exercício 7',
            subtituloHeader: 'Insira os números (horas extras)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        var salario = parseFloat(number);
        horas = parseInt(horas);
        if (horas > 160) {
            var extra = horas - 160;
            var value_extra = ((extra * salario) + (extra * salario * 0.5));
            var total = ((salario * 160) + value_extra).toFixed(2);
            value_extra = (value_extra).toFixed(2);

        } else {
            var total = (salario * horas).toFixed(2);
            value_extra = 0;
        }

        dadosRender = {
            class: 'ex7',
            tituloPagina: 'Exercício 7 - Express-Handlebars',
            tituloHeader: 'Exercício 7',
            subtituloHeader: 'Insira os números (horas extras)',
            dadosValidos: true,
            dados: true,
            mensagemTitulo: "Resultado",
            mensagemTexto: "",
            total: total,
            value_extra: value_extra
        }
    }

    response.render('7', dadosRender);
})

app.get("/8", function (request, response) {
    response.render('8', {
        class: 'ex8',
        tituloPagina: 'Exercício 8 - Express-Handlebars',
        tituloHeader: 'Exercício 8',
        subtituloHeader: 'Insira os números (comissão)'
    });
})
app.post("/8", function (request, response) {

    let number = request.body.number, vendas = request.body.vendas;
    var dadosRender;

    if (number === "" || vendas === "") {
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex8',
            tituloPagina: 'Exercício 8 - Express-Handlebars',
            tituloHeader: 'Exercício 8',
            subtituloHeader: 'Insira os números (comissão)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        var salario = parseFloat(number);
        vendas = parseFloat(vendas);
        if (vendas > 1500) {
            var extra = (vendas - 1500) * 0.05;
            var comissao = extra + (1500 * 0.03);
        } else {
            var comissao = vendas * 0.03;
        }

        var total = (salario + comissao).toFixed(2);
        comissao = (comissao).toFixed(2);

        dadosRender = {
            class: 'ex8',
            tituloPagina: 'Exercício 8 - Express-Handlebars',
            tituloHeader: 'Exercício 8',
            subtituloHeader: 'Insira os números (comissão)',
            dadosValidos: true,
            dados: true,
            mensagemTitulo: "Resultado",
            mensagemTexto: "",
            total: total,
            comissao: comissao
        }

        response.render('8', dadosRender)
    }
})

app.get("/9", function (request, response) {
    response.render('9', {
        class: 'ex9',
        tituloPagina: 'Exercício 9 - Express-Handlebars',
        tituloHeader: 'Exercício 9',
        subtituloHeader: 'Insira os números (desconto gasolina/álcool)'
    });
})
app.post("/9", function (request, response) {

    let number = request.body.number;
    var tipo = request.body.tipo;

    if (number == "" || tipo == "f") {
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex9',
            tituloPagina: 'Exercício 9 - Express-Handlebars',
            tituloHeader: 'Exercício 9',
            subtituloHeader: 'Insira os números (desconto gasolina/álcool)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        var litros = parseFloat(number);
        var gasolina = 3.30;
        var alcool = 2.9;

        if (tipo == "a") {
            if (litros <= 20) {
                var preco = litros * alcool;
                var desconto = preco * 0.03;
            } else {
                var preco = litros * alcool;
                var desconto = preco * 0.05;
            }
        } else if (tipo == "g") {
            if (litros <= 20) {
                var preco = litros * gasolina;
                var desconto = (litros * gasolina) * 0.04;
            } else {
                var preco = litros * gasolina;
                var desconto = (litros * gasolina) * 0.06;
            }
        }
        var total = (preco - desconto).toFixed(2);
        desconto = (desconto).toFixed(2);

        mensagemTitulo = 'Resultado';
        mensagemTexto = '';

        dadosRender = {
            class: 'ex9',
            tituloPagina: 'Exercício 9 - Express-Handlebars',
            tituloHeader: 'Exercício 9',
            subtituloHeader: 'Insira os números (desconto gasolina/álcool)',
            dadosValidos: true,
            dados: true,
            total: total,
            desconto: desconto,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    }

    response.render('9', dadosRender);
})

app.get("/10", function (request, response) {
    response.render('10', {
        class: 'ex10',
        tituloPagina: 'Exercício 10 - Express-Handlebars',
        tituloHeader: 'Exercício 10',
        subtituloHeader: 'Insira os números (nascimento/trabalho)'
    });
})
app.post("/10", function (request, response) {

    let idade = request.body.idade, anos = request.body.anos;

    if (idade === "" || anos === "") {
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex10',
            tituloPagina: 'Exercício 10 - Express-Handlebars',
            tituloHeader: 'Exercício 10',
            subtituloHeader: 'Insira os números (nascimento/trabalho)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        idade = 2022 - idade;
        anos = 2022 - anos;

        if ((idade >= 65) || (anos >= 30) || (idade >= 60 && anos >= 25)) {
            aposentadoria = "REQUER APOSENTADORIA";
        } else {
            aposentadoria = "NÂO REQUER APOSENTADORIA";
        }

        mensagemTitulo = 'Resultado';
        mensagemTexto = '';

        dadosRender = {
            class: 'ex10',
            tituloPagina: 'Exercício 10 - Express-Handlebars',
            tituloHeader: 'Exercício 10',
            subtituloHeader: 'Insira os números (nascimento/trabalho)',
            dadosValidos: true,
            dados: true,
            idade: idade,
            anos: anos,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto,
            aposentadoria: aposentadoria
        }
    }

    response.render('10', dadosRender);
})

app.get("/11", function (request, response) {
    response.render('11', {
        class: 'ex11',
        tituloPagina: 'Exercício 11 - Express-Handlebars',
        tituloHeader: 'Exercício 11',
        subtituloHeader: 'Insira os números (informações pessoais)'
    });
})
app.post("/11", function (request, response) {

    let nome = request.body.nome, email = request.body.email, cpf = request.body.cpf, idade = request.body.idade;

    if (nome === "" || email === "" || cpf === "" || idade === "") {
        mensagemTitulo = 'Cuidado!';
        mensagemTexto = 'Todos os campos devem ser preenchidos!';

        dadosRender = {
            class: 'ex11',
            tituloPagina: 'Exercício 11 - Express-Handlebars',
            tituloHeader: 'Exercício 11',
            subtituloHeader: 'Insira os números (informações pessoais)',
            dadosValidos: false,
            dados: true,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto
        }
    } else {
        mensagemTitulo = 'Resultado';
        mensagemTexto = '';

        dadosRender = {
            class: 'ex11',
            tituloPagina: 'Exercício 11 - Express-Handlebars',
            tituloHeader: 'Exercício 11',
            subtituloHeader: 'Insira os números (informações pessoais)',
            dadosValidos: true,
            dados: true,
            nome: nome,
            email: email,
            cpf: cpf,
            idade: idade,
            mensagemTitulo: mensagemTitulo,
            mensagemTexto: mensagemTexto,
        }
        
    }

    response.render('11', dadosRender);
})
app.listen(PORT, function () {
    console.log('Server is running at port ${PORT}');
});



