const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')

const secret = "ggghfgarewrttgrgrgr125sgsdg78"
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function auth(req, res, next) {
    const authToken = req.headers['authorization']
    if (authToken != undefined) {
        const bearer = authToken.split(' ')
        const token = bearer[0]

        jwt.verify(token, secret, (err, data) => {
            if (err) {
                res.status(401)
                res.json({ err: 'Inválido 2' })

            } else {
                req.token = token
                req.user = { id: data.id, email: data.email }
                next()
            }
        })
    } else {
        res.status(401)
        res.json({ err: "Token inválido" })
    }

}
const DB = {

    games: [{
            id: 1,
            name: "GOD OF WAR",
            year: 2001,
            price: 198.65
        },


        {
            id: 2,
            name: "GOD OF WAR 2",
            year: 2004,
            price: 200.65
        },

    ],
    users: [{
            id: 1,
            ame: 'Matheus',
            email: 'matheusdepaula527@gmail.com',
            senha: '123456'
        },
        {
            id: 2,
            ame: 'Matheus2',
            email: 'matheusdepaula57@gmail.com',
            senha: '123'
        }
    ]
}





app.get("/games", auth, (req, res) => {
    var hateos = [{
        href: "http://localhost:3333/games",
        method: "post",
        rel: "post_game"
    }, {
        href: "http://localhost:3333/games",
        method: "get",
        rel: "get_game"
    }]
    res.statusCode = 200
    res.json({
        games: DB.games,
        _links: hateos
    })
})

app.get("/games/:id", auth, (req, res) => {

    var id = req.params.id
    if (isNaN(id)) {
        res.sendStatus(400)

    } else {
        var iD = parseInt(req.params.id)
        var hateos = [{
            href: "http://localhost:3333/games",
            method: "post",
            rel: "post_game"
        }, {
            href: "http://localhost:3333/games/" + iD,
            method: "get",
            rel: "get_game"
        }]
        var Game = DB.games.find(game => game.id == iD)
        if (Game != undefined) {
            res.sendStatus = 200
            res.json(Game)
        } else {
            res.sendStatus = 404
            res.send("NOt Found")
        }
    }
})

app.post("/games", auth, (req, res) => {
    var { title, price, year } = req.body;

    DB.games.push({
        id: 55,
        title,
        price,
        year
    })

    res.sendStatus(200)
})

app.delete("/games/:id", auth, (req, res) => {
    var id = req.params.id
    if (isNaN(id)) {
        res.sendStatus(400)

    } else {
        var iD = parseInt(req.params.id)

        var index = DB.games.findIndex(game => game.id == iD)
        if (index == -1) {
            res.sendStatus(400)
        } else {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }

    }
})
app.put("/games/:id", auth, (req, res) => {
    var id = req.params.id
    if (isNaN(id)) {
        res.sendStatus(400)

    } else {
        var iD = parseInt(req.params.id)

        var Game = DB.games.find(game => game.id == iD)
        if (Game != undefined) {
            var { name, price, year } = req.body;

            if (name != undefined) {

                Game.name = name
            }


            if (price != undefined) {

                Game.price = price
            }


            if (year != undefined) {

                Game.year = year
            }

            res.sendStatus(202)


        } else {
            res.sendStatus = 404
            res.send("NOt Found")
        }
    }
})
app.post("/auth", (req, res) => {
    var { email, senha } = req.body
    if (email != undefined) {
        var us = DB.users.find(use => use.email == email)

        if (us != undefined) {
            if (us.senha == senha) {
                jwt.sign({ id: us.id, email: us.email }, secret, {
                    expiresIn: '48h'
                }, (err, token) => {
                    if (err) {
                        res.status(400)
                        res.json({ err: "Falha interna" })
                    } else {
                        res.status(200);
                        res.json({ token: token })
                    }
                })


            } else {
                res.status(401);
                res.json({ err: 'inválido' })
            }

        } else {
            res.status(404)
            res.json({ err: "Email não existe" })
        }

    } else {
        res.status(400);
        res.json({ err: "O e-mail é inválido" })
    }

})
app.listen(3333)