import re

with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_block = '''            } else if (secao === "voce") {
                const logado = localStorage.getItem('usuarioLogadoComGoogle');
                if (!logado) {
                    mostrarToast("Faça login para acessar seu canal.");
                } else {
                    carregarCanalDoUsuario();
                    mostrarView("voce");
                }
            }'''

new_block = '''            } else if (secao === "voce") {
                const logado = localStorage.getItem('usuarioLogadoComGoogle');
                if (!logado) {
                    mostrarToast("Faça login para acessar seu canal.");
                } else {
                    carregarCanalDoUsuario();
                    mostrarView("voce");
                }
            } else if (secao === "assistir_mais_tarde") {
                mostrarView("assistir_mais_tarde");
            } else if (secao === "curtidos") {
                mostrarView("curtidos");
            }'''

# Replace normal characters, handling encoding issues 
# Actually, since the text in old_block has 'Faça', we should be careful with encodings if powershell mangled it.
# Let's use regex based on 'secao === "voce"'
js = re.sub(
    r'(\} else if \(secao === "voce"\) \{[^}]+}[^}]+}[^}]+})',
    r'\1 else if (secao === "assistir_mais_tarde") { mostrarView("assistir_mais_tarde"); } else if (secao === "curtidos") { mostrarView("curtidos"); }',
    js
)

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Fase 3 sidebar click logic added")
