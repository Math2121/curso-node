const moongose = require('mongoose')
const articleModel = require('./model/article')

//Fazendo conexão com o banco no Mongo
moongose.connect("mongodb://localhost:27017/aprendendoMongo",{useNewUrlParser:true,useUnifiedTopology:true})

const Article = moongose.model("Article",articleModel)

//Buscar Dados
Article.find({}).then((articles)=>{
    console.log(articles)
}).catch(err=>{console.log(err)})

// Article.findByIdAndUpdate("601d660ac66d650e14e9b0c2",{
//     title:"Mongo do zero",
//     body:" estuda estuda"
// }).then(()=>{
//     console.log("Atualizado")
// }).catch(err=>{console.log(err)})

//Buscando dado específico
// Article.find({'title':'Teste'}).then((articles)=>{
//         console.log(articles)
//     }).catch(err=>{console.log(err)})

//Removendo dado
// Article.findByIdAndDelete("601d638d435025268c69c276").then(()=>{
//     console.log("removido")
// }).catch(err=>console.log(err))


//Cadastro
// const artigo = new Article({title:"React",author:"Matheus",body:"nsdnsjkds akds"})

// artigo.save().then(()=>{
//     console.log("Artigo Salvo")
// }).catch(err=>{
//     console.log(err)
// })

















