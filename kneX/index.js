const { query } = require('express')
var connection = require('./connection')

//Insert
// var dados = {
//     nome:'Blac of Dutty',
//     preco:250.65
// }

//   connection.insert(dados).into('games').then(data=>{
// console.log(data)
//  }).catch(err=>{
//      console.log(err)
//  })

//Select
// connection.select(['id','preco']).table('games').then(data=>{
//     console.log(data)
// }).catch(err=>{
//          console.log(err)
//     })


//Nested Queries
// connection.insert({nome:'GOD 2',preco:500.00}).into('games').then(data=>{
//     connection.select(['id','preco']).table('games').then(data=>{
//             console.log(data)
//         }).catch(err=>{
//                  console.log(err)
//             })
//     

//Where
// var querry = connection.select()
// .whereRaw("preco > 50")
// .where({nome:"Call of Dutty"}).table('games').then(data=>{
//     console.log(data)
// }).catch(err=>{
//                  console.log(err)
//             })

//Delete
// connection.where({id:1}).delete().table('games').then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })

//Update
// connection.where({id:2}).update({preco:200}).table('games').then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })

// Order By
// connection.select().table('games').orderBy('nome','desc').then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })

//Associated Insert
// connection.insert({
//     nome:"Blizzard",
//     game_id:2
// }).table('estudio').then(data=>{
//     console.log(data)
// }).catch(err=>{
//         console.log(err)
// })


//Relacioamento 1 para 1
// connection.select(['games.id','estudio.id as est_id','games.nome']).table('games').innerJoin('estudio','estudio.game_id','games.id').then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })

//Relacioamento 1 para M
// connection.select(['games.*','estudio.nome as est_id']).table('games').innerJoin('estudio','estudio.game_id','games.id').then(data=>{
// var estudiosGames = data;
// var games = {
//     id:0,
//     nome:"",
//     estudios : []
// }
// games.id = data[0].id;
// games.nome = data[0].nome
// data.forEach(estudio=>{
//     games.estudios.push({nome:estudio.est_id})
// })
// console.log(games)
// }).catch(err=>{
//     console.log(err)
// })

//Relacionamento M to M
// connection.select(
//         [
//             "estudio.nome as Estudio_nome",
//             "games.nome as Game_Nomes",
//             "games.preco as Preco_game"
//         ]).table("games_estudios")
//     .innerJoin("games", "games.id", "games_estudios.game_id")
//     .innerJoin("estudio", "estudio.id", "games_estudios.estudio_id")
//     .then(data => {
//         console.log(data)
//     }).catch(err => {
//         console.log(err)
//     })


//Transactions
// async function testeTransacao() {

//     try {
//         await connection.transaction(async trans => {
//             await connection.insert({ nome: "Anvisa" }).table("estudio")
//             await connection.insert({ nome: "Anvisa Bros" }).table("estudio")
//             await connection.insert({ nome: "Mojang" }).table("estudio")
//         })
//     } catch (err) {
//         console.log(err)
//     }

// }

// testeTransacao()