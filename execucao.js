const oi = document.querySelectorAll(".dedo")
const digitados = document.querySelector("#numeros-digitados")
const tela = document.querySelector("#tela")
const confirmar = document.querySelector(".confirmar")
const corrige = document.querySelector(".corrige")

function callOnClick(eve) {
    const button = eve.target
    digitados.textContent += button.textContent
}

oi.forEach(opa => {
    opa.addEventListener("click", callOnClick)
})

function verificação() {
    let escrito = digitados.textContent
    switch (escrito) {
        case '55':
            tela.style.backgroundColor = "yellow"
            fetch('/envio55', {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ escrito: escrito })
            })
            digitados.textContent =""
            break

        case '40':
            tela.style.backgroundColor = "red"
            fetch('/envio40', {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ escrito: escrito })
            })
            digitados.textContent =""
            break
    }

}
function apagar() {
    digitados.textContent = ""
}

confirmar.addEventListener("click", verificação)
corrige.addEventListener("click", apagar)

//pegando o servidor pra fazer a contagem HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA


const valorVermelho = document.querySelector(".valor-vermelho")
const valorAmarelo = document.querySelector(".valor-amarelo")


setInterval(async() => {
    const servidorBom = await fetch("./lista.json").then(response => response.json())
    valorVermelho.textContent = ""
    valorAmarelo.textContent = ""

    valorVermelho.textContent += servidorBom["40"]["length"]
    valorAmarelo.textContent += servidorBom["55"]["length"]
}, 500);
