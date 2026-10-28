function calcularIMC() { 
    let alturaInput = document.getElementById("altura").value; 
    let pesoInput = document.getElementById("peso").value; 

    // 1. Substitui a vírgula por ponto (caso digitem 1,75)
    alturaInput = alturaInput.replace(',', '.');
    pesoInput = pesoInput.replace(',', '.');

    let altura = parseFloat(alturaInput); 
    let peso = parseFloat(pesoInput); 

    // Validação básica
    if (!altura || !peso || altura <= 0 || peso <= 0) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    // 2. CORREÇÃO AUTOMÁTICA: Se digitar em centímetros (ex: 175), converte para metros (1.75)
    if (altura > 3) { 
        altura = altura / 100; 
    }

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

    document.getElementById("resultado-imc").textContent = imc.toFixed(2); 
    document.getElementById("classificacao-imc").textContent = classificacao; 
}

