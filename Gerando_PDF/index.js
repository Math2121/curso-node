var pdf = require('html-pdf')

var html = `

<h1>Olá mundo</h1>
<hr>
<p> Esse pdf foi gerado com <b>sucesso</b></p>

`

pdf.create(html,{}).toFile("./meupdf.pdf",(err,res)=>{
    if(err){
        console.log("Um erro ocorreu")

    }else{
        console.log(res)
    }
});