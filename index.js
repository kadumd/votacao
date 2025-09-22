const http = require("http");
const fs = require("fs");

const servidor = http.createServer((pedido, resposta) => {
    switch (pedido.url) {
        case '/':
            resposta.writeHead(200, { "Content-Type": "text/html" })
            resposta.end(fs.readFileSync("./index.html"))
            break

        case '/index.css':
            resposta.writeHead(200, { "Content-Type": "text/css" })
            resposta.end(fs.readFileSync("./index.css"))
            break

        case '/execucao.js':
            resposta.writeHead(200, { "Content-Type": "text/javascript" })
            resposta.end(fs.readFileSync("./execucao.js"))
            break

        case '/lista.json':
            resposta.writeHead(200, { "Content-Type": "application/json" })
            resposta.end(fs.readFileSync("./lista.json"))
            break


        case '/envio55':
            pedido.on('data', (body) => {
                console.log(JSON.parse(body))
                let dadosDoBanco = JSON.parse(fs.readFileSync('./lista.json'))
                let novosDados = JSON.parse(body)

                dadosDoBanco["55"].push(novosDados)

                fs.writeFileSync('lista.json', JSON.stringify(dadosDoBanco));
                resposta.end(JSON.stringify({dadosDoBanco, novosDados}))
            })
            break

        case '/envio40':
            pedido.on('data', (body) => {
                console.log(JSON.parse(body))
                let dadosDoBanco = JSON.parse(fs.readFileSync('./lista.json'))
                let novosDados = JSON.parse(body)

                dadosDoBanco["40"].push(novosDados)

                fs.writeFileSync('lista.json', JSON.stringify(dadosDoBanco));
                resposta.end(JSON.stringify({dadosDoBanco, novosDados}))
            })
            break
    }
})

servidor.listen(3000)