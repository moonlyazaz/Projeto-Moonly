with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add display logic for sidebarVoceGroup
js = js.replace('document.getElementById(\"sidebarLogin\").style.display = \"none\";', 'document.getElementById(\"sidebarLogin\").style.display = \"none\";\\n    const sidebarVoce = document.getElementById(\"sidebarVoceGroup\");\\n    if(sidebarVoce) sidebarVoce.style.display = \"block\";\\n    const sidebarVoceDivisor = document.getElementById(\"sidebarVoceDivisor\");\\n    if(sidebarVoceDivisor) sidebarVoceDivisor.style.display = \"block\";')

js = js.replace('document.getElementById(\"sidebarLogin\").style.display = \"block\";', 'document.getElementById(\"sidebarLogin\").style.display = \"block\";\\n    const sidebarVoce = document.getElementById(\"sidebarVoceGroup\");\\n    if(sidebarVoce) sidebarVoce.style.display = \"none\";\\n    const sidebarVoceDivisor = document.getElementById(\"sidebarVoceDivisor\");\\n    if(sidebarVoceDivisor) sidebarVoceDivisor.style.display = \"none\";')

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
