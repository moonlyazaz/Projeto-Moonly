import re
with open('frontend/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix literal \n
js = js.replace('\\n', '\n')

with open('frontend/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
