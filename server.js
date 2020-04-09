//usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()


const db = require("./db")

//CONFIGURAÇÃO DO NUNJUCKS
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,

})


//configurar arquivos estaticos
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//criei um rota/
//capturei o pedido do cliente para responder
server.get("/", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })

})

server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas })
    })
})

//fornecendo os valores ao banco
server.post("/", function (req, res) {
      
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            url
        ) VALUES (?,?,?,?,?);
   `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.url,
    ]
    
    //redirecionando pagina ideias
    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideias")
 
    })
})

//liguei meu servidor na porta 3000
server.listen(3000)