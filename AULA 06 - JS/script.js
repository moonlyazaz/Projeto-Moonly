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
