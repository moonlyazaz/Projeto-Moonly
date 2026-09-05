with open('frontend/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add new variables for inputs and placeholders if not exist, or just use existing.
css = css.replace('background-color: #121212;', 'background-color: var(--bg-primary);')
css = css.replace('background-color: #181818;', 'background-color: var(--bg-primary);')
css = css.replace('color: #909090;', 'color: var(--text-secondary);')

# Wait, there's another background in mic button?
css = css.replace('background-color: #181818;', 'background-color: var(--bg-primary);') # Just in case

with open('frontend/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
