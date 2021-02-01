//Função assícrona
// setTimeout(() => {
//     console.log("Olá")
// }, 1000)

//Uso de Callbacks
// function enviarEmail(corpo, para, callback) {
//     setTimeout(() => {
//         var erro = true;
//         if (erro) {
//             callback("O email falhou");
//         } else {
//             callback("Ok");
//         }

//     }, 8000)

// }
// console.log("Início do envio de email")
// enviarEmail("Assunto", "Matheus", (err) => {
//     if (err == undefined) {
//         console.log("Email enviado")
//     } else {
//         console.log("Ocorreu um erro:" + err)
//     }


// })

// Transfrormar funções em Promisses
function pegardId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: 5 })
        }, 1000);
    })
}

function buscaBanco() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ email: "matheus@gmail.com" })
        }, 1000);
    })
}

function enviar(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var erro = false
            if (!erro) {
                resolve({ time: 4, to: para })
            } else {
                reject()
            }
        }, 4000)
    })
}
//Minha solução
function transforma() {
    pegardId().then(({ id }) => {
        console.log("O id pego foi:" + id)
        buscaBanco(id).then(async({ email }) => {
            var email2 = await enviar("assunt", email)
            console.log(email2)
        })
    })
}
async function principal() {
    var id = await pegardId()
    var email = await buscaBanco(id)
    try {
        await enviar("Olá tudo bem", email)
    } catch (error) {
        console.log(erro)
    }
}
principal()
    // transforma()
    // function pegarUser() {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve([
    //                 { name: "Matheus", lang: "Js" },
    //                 { name: "Matheus2", lang: "php" },
    //                 { name: "Matheus3", lang: "C++" },

//             ])
//         }, 2000);

//     })
// }

// async function principal() {
//     var user = await pegarUser()
//     console.log(user)
// }

// principal()
// pegardId().then(({ id }) => {
//         buscaBanco(id).then(({ email }) => {
//             enviar("Assunto", email).then(() => {
//                 console.log("Email enviado")
//             }).catch(err => {
//                 console.log(err)
//             })
//         })
//     })
// enviar("Olá Mundo", "Matheus").then(({ time, to }) => {
//     console.log(`
//     Tempo: ${time}
//     ------------
//     Para: ${to}
//     `)
//     console.log("Deu tudo certo!")
// }).catch(() => {
//     console.log("Não due certo")
// })