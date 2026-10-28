let numero1 = Number(prompt("Digite o primeiro numero: "))
let numero2 = Number(prompt("Digite o segundo numero: "))
let operacao = String(prompt("Informe a operação: [+][-][x][/]"))

if(operacao == "+") {
    alert(numero1 + numero2)
} else if (operacao == "-") {
    alert(numero1 - numero2)
} else if (operacao == "x") {
    alert(numero1 * numero2)
} else if (operacao == "/") {
   alert(numero1 / numero2) 
}