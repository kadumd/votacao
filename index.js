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
            {
                let body = "";
                pedido.on("data", chunk => body += chunk);
                pedido.on("end", () => {
                    try {
                        let dadosDoBanco = JSON.parse(fs.readFileSync('./lista.json'));
                        let novosDados = JSON.parse(body);

                        dadosDoBanco["55"].push(novosDados);

                        fs.writeFileSync('lista.json', JSON.stringify(dadosDoBanco, null, 2));
                        resposta.writeHead(200, { "Content-Type": "application/json" });
                        resposta.end(JSON.stringify({ msg: "ok" }));
                    } catch (err) {
                        resposta.writeHead(500);
                        resposta.end("Erro ao salvar dados");
                        console.error(err);
                    }
                });
            }
            break

        case '/envio40':
            {
                let body = "";
                pedido.on("data", chunk => body += chunk);
                pedido.on("end", () => {
                    try {
                        let dadosDoBanco = JSON.parse(fs.readFileSync('./lista.json'));
                        let novosDados = JSON.parse(body);

                        dadosDoBanco["40"].push(novosDados);

                        fs.writeFileSync('lista.json', JSON.stringify(dadosDoBanco, null, 2));
                        resposta.writeHead(200, { "Content-Type": "application/json" });
                        resposta.end(JSON.stringify({ msg: "ok" }));
                    } catch (err) {
                        resposta.writeHead(500);
                        resposta.end("Erro ao salvar dados");
                        console.error(err);
                    }
                });
            }
            break
    }
});

servidor.listen(3000);
