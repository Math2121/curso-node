const cors = require('cors')
const express = require('express')
const app = express()

const axios = require('axios')
app.use(cors())
app.get('/',async (req,res)=>{
    try{
        const {data} =  await axios('https://jsonplaceholder.typicode.com/photos')
        
        for(let dat of data){
            return res.send(dat.title)
        }
    }catch (error){
        console.log(error)
    }

})
app.listen('4000')