const express = require('express');
const { default: slugify } = require('slugify');
const Category = require('../categories/categorie');
const { route } = require('../categories/CategoriesController');
const Article = require('./articles');
const auth = require("../middlewares/adminAuth")
const router = express.Router();
router.get("/admin/articles",auth,(req,res)=>{
    Article.findAll({
        include:[{model:Category}]
    }).then((articles)=>{
        res.render("admin/articles/index",{articles:articles})
    })


})
router.get('/admin/articles/new',auth,(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/articles/new",{categories:categories})
    })
    
})


router.post('/articles/save',auth,(req,res)=>{
   var title = req.body.title 
   var body = req.body.body 
   var category = req.body.category

   Article.create({
       title:title,
       slug:slugify(title),
       body:body,
       categoryId: category
   }).then(()=>{
       res.redirect("/admin/articles")
   })
    
})

router.post("/articles/delete",auth, (req, res) => {
    var id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles')
                console.log("Deletou!")
            })
        } else {
            res.redirect('/admin/articles')
            console.log("ERRO1")
        }
    } else {
        res.redirect('/admin/articles')
        console.log("ERRO2")
    }
})

router.get("/articles/edit/:id",auth,(req,res)=>{
    var id = req.params.id

    if (isNaN(id)) {
        res.redirect("admin/articles")
    }
    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories=>{
                res.render("admin/articles/edit", {
                    article:article,
                    categories: categories
                })
            })
      
        } else {
            res.redirect("admin/articles")
        }
    }).catch(err => {
        res.redirect("admin/articles")
    })
})

router.post('/article/update',auth,(req,res)=>{
    var id = req.body.id 
    var title = req.body.title 
    var body = req.body.body 
    var category = req.body.category 

    Article.update({title:title,body:body, categoryId:category,slug:slugify(title)},{where:{
        id:id
    }}).then(()=>{
        res.redirect("/admin/articles")
    }).catch(err=>{
        res.redirect("/")
    })

})

router.get('/articles/page/:num',(req,res)=>{
    var page = req.params.num;
    var off = 0;
    if(isNaN(page) || page == 1){
        off = 0
    }else{
        off = (parseInt(page)-1) * 4;
    }
  
    Article.findAndCountAll({
        order:[
            ['id','DESC']
        ],
        limit:4,
        offset:off
    }).then(articles=>{

        var next
        if(off + 4>= articles.count){
            next = false

        }else{
            next = true
        }
        var result = {
            page:parseInt(page),
            articles: articles,
            next:next

        }
        Category.findAll().then(categories=>{
            res.render("admin/articles/page",{
                result:result,
                categories:categories
            })
        })

    })
})

module.exports =  router