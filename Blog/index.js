const express = require('express')
const app = express();
const session = require("express-session");
const bodyParser = require('body-parser')
const connection = require('./database/database')
const categories = require('./categories/CategoriesController')
const articles = require('./articles/articlesController')
const Article = require('./articles/articles')
const Category = require('./categories/categorie');
const User = require('./user/User')
const user = require('./user/userController')




app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
    secret:"coisa1",
    cookie:{
        maxAge:30000
    }
}))

connection
    .authenticate()
    .then(()=>{
    console.log("Deu certo")
    }).catch(err=>{
    console.log(err)
    })

app.use('/',categories)

app.use('/',articles)

app.use('/',user)


app.get("/",(req,res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit:4
    }).then(articles=>{
       Category.findAll().then(categories=>{
        res.render("index",{articles:articles, categories:categories})
       })
       
    })
   
})

app.get("/:slug",(req,res)=>{
    var slug = req.params.slug 
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{

        if(article  != undefined){

            Category.findAll().theb(categories=>{
                res.render("article",{
                    article:article,
                    categories:categories
                })
               })
         
        }else{
            res.redirect("/")
        }
       
    }).catch(err=>{
        res.redirect("/")
    })
})

app.get("/category/:slug",(req,res)=>{
    var slug = req.params.slug 
    Category.findOne({
        where:{
            slug:slug
        },
        include: [{model:Article}]
    }).then(category=>{
        if(category != undefined){
            Category.findAll().then(categories=>{
                res.render("index",{articles:category.articles,categories:categories})
            })
        }else{
            res.redirect("/");
        }

    }).catch(err => {
        res.redirect("/")
    })
})
app.listen(4000)