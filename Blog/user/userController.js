const express = require("express")
const router = express()
const User = require('./User')
const bcrypt = require('bcryptjs')
const { route } = require("../articles/articlesController")

router.get("/admin/users",(req,res)=>{
    User.findAll().then(users=>{
        res.render("users/index",{users:users})
    })
})

router.get("/admin/users/create",(req,res)=>{
    res.render("users/create")
})


router.post("/users/create",(req,res)=>{
var email = req.body.email 
var password = req.body.password


User.findOne({where:{email:email}}).then(user=>{
    if(user == undefined){
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(password,salt)
        
        User.create({
            email:email,
            password:hash,
        }).then(()=>{
            res.redirect("/admin/users")
        }).catch((err)=>{
            res.redirect('/')
        })

    }else{
        res.redirect("/admin/users/create")
    }
})

})


router.get("/login",(req,res)=>{
    res.render("users/login")
})

router.post("/auth",(req,res)=>{
    var email = req.body.email 
    var password = req.body.password 

    User.findOne({where:{email:email}}).then(user=>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password,user.password)
            if(correct){
                req.session.user = {
                    id:user.id,
                    email:user.email
                }
                res.redirect("/admin/articles")
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("/login")
        }
    }).catch(err=>{
        console.log(err)
    })
})

router.get("/logout",(req,res)=>{
    req.session.user = undefined
    res.redirect("/")
})
module.exports = router
