with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('if(sidebarVoceDivisor) sidebarVoceDivisor.style.display = \"block\";', 'if(sidebarVoceDivisor) sidebarVoceDivisor.style.display = \"block\";\\n    document.getElementById(\"sidebarInscricoesGroup\").style.display = \"block\";\\n    document.getElementById(\"sidebarInscricoesDivisor\").style.display = \"block\";')

js = js.replace('if(sidebarVoceDivisor) sidebarVoceDivisor.style.display = \"none\";', 'if(sidebarVoceDivisor) sidebarVoceDivisor.style.display = \"none\";\\n    document.getElementById(\"sidebarInscricoesGroup\").style.display = \"none\";\\n    document.getElementById(\"sidebarInscricoesDivisor\").style.display = \"none\";')

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
