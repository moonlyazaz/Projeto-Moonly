let idade = 10
let classificacao = '';

if (idade < 12) {
    classificacao += 'Pre-Adolescente'
} else if (idade < 19) {
    classificacao += 'Adolescente'
} else if (idade < 20) {
    classificacao += 'Jovem Adulto'
} else if (idade < 44) {
    classificacao += 'Adulto Senior'
} else if (idade < 58) {
    classificacao += 'Terceira Idade'
}

console.log(classificacao)




// outra parte do codigo

let dia = "sun"
let diaTraduzido = '';

switch (dia) {
    case "mon": 
    diaTraduzido = "Segunda-Feira"
    break;
    case "tue": 
    diaTraduzido = "Terça-Feira"
    break;
    case "wed": 
    diaTraduzido = "Quarta-Feira"
    break;
    case "thu": 
    diaTraduzido = "Quinta-Feira"
    break;
    case "fri": 
    diaTraduzido = "Sexta-Feira"
    break;
    case "sat": 
    diaTraduzido = "Sábado"
    break;
    case "sun": 
    diaTraduzido = "Domingo"
    break
    default: 
    diaTraduzido = "Dia inexistente"
}

console.log(diaTraduzido)

// Outro codigo

 let nota = 90

 if (nota >= 60) {
    console.log("Aprovado!")
 } else if (nota >= 59){
    console.log("Recuperação!")
 } else if (nota <= 58){
    console.log("Reprovado Burro, Estude Mais!")
 }

 // Proximo Codigo LEGALEs

 
