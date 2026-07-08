

function calcularIMC()  {
    let altura = document.getElementById("altura").value
    let peso = document.getElementById("peso").value

    altura = parseInt(altura)
    peso = parseInt(peso)

    let imc = peso / (altura**2)

    let classificacao = '' 
    if (imc < 18.5) {
       classificacao = 'ABAIXO DO PESO'
    }
    

    document.getElementById("resultado-imc").textContent += imc
    document.getElementById("classificacao-imc").textContent += classificacao

}
