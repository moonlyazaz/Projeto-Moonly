function calcularIMC() {
    let altura = document.getElementById("altura").value;
    let peso = document.getElementById("peso").value;

    altura = parseInt(altura);
    peso = parseFloat(peso);

    let imc = peso / (altura ** 2);

    let classificacao = '';
    if (imc < 18.5) {
        classificacao = 'ABAIXO DO PESO';
    } else if (imc >= 18.5 && imc < 25.0) {
        classificacao = 'PESO NORMAL';
    } else if (imc >= 25.0 && imc < 30.0) {
        classificacao = 'EXCESSO DE PESO';
    } else if (imc >= 30.0 && imc < 35.0) {
        classificacao = 'OBESIDADE TIPO I';
    } else if (imc >= 35.0 && imc < 40.0) {
        classificacao = 'OBESIDADE TIPO II';
    } else {
        classificacao = 'OBESIDADE TIPO III';
    }


    document.getElementById("resultado-imc").textContent = imc;
    document.getElementById("classificacao-imc").textContent += classificacao;

}
