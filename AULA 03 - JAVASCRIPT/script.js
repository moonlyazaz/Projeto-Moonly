function calcularIMC()  {
    let altura = document.getElementById("altura").value
    let peso = document.getElementById("peso").value

    altura = parseInt(altura)
    peso = parseFloat(peso)

    let imc = peso / (altura**2)

    let classificacao = '' 
    if (imc < 18.5) {
        classificacao = 'ABAIXO DO PESO'
    } else if (imc >= 18.5 && imc < 25.0) {  // ✅ Intervalo 18.5 a 24.9
        classificacao = 'PESO NORMAL'
    } else if (imc >= 25.0 && imc < 30.0) {  // ✅ Intervalo 25.0 a 29.9
        classificacao = 'EXCESSO DE PESO'
    } else if (imc >= 30.0 && imc < 35.0) {  // ✅ Intervalo 30.0 a 34.9
        classificacao = 'OBESIDADE TIPO I'
    } else if (imc >= 35.0 && imc < 40.0) {  // ✅ Intervalo 35.0 a 39.9
        classificacao = 'OBESIDADE TIPO II'
    } else {
        classificacao = 'OBESIDADE TIPO III'  // ✅ >= 40.0
    }

    
    document.getElementById("resultado-imc").textContent += imc
    document.getElementById("classificacao-imc").textContent += classificacao

}
