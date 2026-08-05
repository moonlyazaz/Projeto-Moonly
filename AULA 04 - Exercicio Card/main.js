// 1. Array corrigido com vírgulas e objetos padronizados
let items = [
  { title: "Titulo 1", content: "Conteudo 1" },
  { title: "Titulo 2", content: "Conteudo 2" },
  { title: "Titulo 3", content: "Conteudo 3" }
];

// 2. Seleciona o container fora do loop (mais performático)
let container = document.getElementById("container");

// 3. Loop FOR corrigido com parênteses e incremento de 1 em 1
for (let contador = 0; contador < items.length; contador++) {
  
  // 4. Criação dos elementos usando o item atual do loop: items[contador]
  let card = document.createElement("div");
  card.className = "card";
 
  let h2 = document.createElement("h2");
  h2.textContent = items[contador].title; // Dinâmico por causa do contador

  let p = document.createElement("p");
  p.textContent = items[contador].content; // Dinâmico por causa do contador

  // 5. Junta os elementos e adiciona no container correto
  card.appendChild(h2);
  card.appendChild(p);
  container.appendChild(card);
}