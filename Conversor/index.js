const fs = require("fs");
var Reader = require("./Reader")
var leitor = new Reader()
var Process = require("./Proccess")
var Table = require('./Table')
const HtmlParse = require("./HtmlParser");
var Writer = require("./Writer")
var Pdf = require('./PDFWRITER')
var leitor = new Reader()
var escritor = new Writer();
async function main(){

    var dados = await leitor.Read("./user.csv")

    var dadosProcessados = Process.Processor(dados)

    var users = new Table(dadosProcessados)

    var Html = await HtmlParse.Parser(users)

    escritor.Writer(Date.now()+".html",Html)
   
    Pdf.writePdf(Date.now() + '.PDF',Html)
}

main()
//Ler arquivos
// fs.readFile("./text.txt",{encoding:'utf-8'}, (err, data) => {
//     if (err) {
//         console.log("Occoreu um erro!")
//     }else{
//         console.log(data)
//     }
// });

//Escrevendo em arquivo
// fs.writeFile("./text.txt","Novo coisa",(err)=>{
//     if(err){
//         console.log("Ocorreu um erro")
//     }
// })

// function modificarUSer(nome, curso, id){
//     fs.readFile("./user.json",{encoding:'utf-8'},(err,data)=>{
//         if(err){
//             console.log("Ocorreu um erro")
//         }else{
//             var dados = JSON.parse(data)// texto -> JSON
//             dados.nomer = nome;
//             dados.curso = curso;
//             dados.id = id;
//             fs.writeFile("./user.json",JSON.stringify(dados),(err)=>{
//                 if(err){
//                     console.log("Um erro ocorreu")
//                 }
             
//             })
           
//         }
//     })
// }
// modificarUSer("Node","JS",6)


 