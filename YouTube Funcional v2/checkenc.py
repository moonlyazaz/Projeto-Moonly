# The file IS properly UTF-8 encoded (0xC3 0xAD = í in UTF-8)
# So the issue is PowerShell's Get-Content is reading it wrong and displaying garbage
# Let's verify by decoding it properly
with open('frontend/index.html', 'rb') as f:
    raw = f.read()

idx = raw.find(b'<span>In')
chunk = raw[idx:idx+20]
print('Decoded correctly:', chunk.decode('utf-8'))
