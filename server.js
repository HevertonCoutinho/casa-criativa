//usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()



const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title: "Cursos de programação",
        category: "Estudo",
        description: "Faça um curso de programação para ocupar sua cabeça.",
        url: "https://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/906/906201.svg",
        title: "Exercicios",
        category: "Saude",
        description: "Faça exercicios para ocupar sua cabeça.",
        url: "https://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Estudo",
        description: "faça meditação para ocupar sua cabeça.",
        url: "https://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Cantar",
        description: "Quem canta seus males espanta.",
        url: "https://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/883/883746.svg",
        title: "Edição de fotos",
        category: "Criatividade",
        description: "Faça cursos de edição de fotos",
        url: "https://www.rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/774/774502.svg",
        title: "Inglês",
        category: "Idiomas",
        description: "Experimente aprender um novo idioma",
        url: "https://www.rocketseat.com.br"
    }
]

//CONFIGURAÇÃO DO NUNJUCKS
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,

})


//configurar arquivos estaticos
server.use(express.static("public"))

//criei um rota/
//capturei o pedido do cliente para responder
server.get("/", function (req, res) {

    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function (req, res) {

    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas})
})

//liguei meu servidor na porta 3000
server.listen(3000)