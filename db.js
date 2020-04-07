const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./casa-criativa.db')

db.serialize(function () {
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    const query = `
    INSERT INTO ideas(
       image,
       title,
       category,
       description,
       link
    ) VALUES (?,?,?,?,?);
   `
    const values = [
       "https://image.flaticon.com/icons/svg/906/906201.svg",
       "Cursos de programação",
       "Estudo",
       "Faça um curso de programação para ocupar sua cabeça.",
       "https://www.rocketseat.com.br"
    ]

    db.run(query, values, function(err) {
       if (err) return console.log(err)

      console.log(this)
    })


    //deletar ideia 
    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
       if (err) return console.log(err)

     console.log("DELETEI", this)
    })

    //consultar dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows){
       if (err) return console.log(err)

       console.log(rows)
    })
    
})

module.exports = db     