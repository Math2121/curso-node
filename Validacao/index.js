const bodyParser = require("body-parser")
var express = require("express")
var app = express()
var session = require("express-session")
var flash = require("express-flash")
var cookie = require("cookie-parser")

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookie("erro123"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash())


app.get("/", (req, res) => {
    var emailErr = req.flash("emailErr")
    var nomeErr = req.flash("nomeErr")
    var pontoErr = req.flash("pontoErr")

    emailErr = (emailErr == undefined || emailErr == 0) ? undefined : emailErr
    nomeErr = (nomeErr == undefined || nomeErr == 0) ? undefined : nomeErr
    pontoErr = (pontoErr == undefined || pontoErr == 0) ? undefined : pontoErr
    res.render("index", { emailErr, nomeErr, pontoErr })
})

app.post("/form", (req, res) => {
    var { email, nome, pontos } = req.body

    var emailErr
    var nomeErr
    var pontoErr
    if (email == undefined || email == "") {
        emailErr = "O e-mail não deve ser vazio"

    }
    if (nome == undefined || nome == "") {
        nomeErr = "O nome não poder ser vazio"
    }
    if (pontos == undefined || pontos <= 20) {
        pontoErr = "Voc~e não pode ter menos de vinte pontos"
    }



    if (emailErr != undefined || pontoErr != undefined || nomeErr != undefined) {
        req.flash("emailErr", emailErr)
        req.flash("pontoErr", pontoErr)
        req.flash("nomeErr", nomeErr)

        res.redirect("/")
    } else {
        res.send("Ok!!")
    }
})
app.listen(3001)