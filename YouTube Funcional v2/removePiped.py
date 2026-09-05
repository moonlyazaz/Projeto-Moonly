import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Regex to remove the Piped Proxy block
# Start from // ==================== PROXY PIPED API ==================== to the end of the block
js = re.sub(r'// ==================== PROXY PIPED API ====================.*?\}\);', '', js, flags=re.DOTALL)
js = js.replace('\n\n\n', '\n\n')

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Piped Proxy removed")
