import re
with open('frontend/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('background-color: #282828;', 'background-color: var(--bg-secondary);')
css = css.replace('background-color: #525252;', 'background-color: var(--border-color);') # Hover state for menu button was #525252

new_css = '''
.menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    cursor: pointer;
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 14px;
}
.menu-item:hover {
    background-color: var(--bg-hover);
}
.menu-item i {
    font-size: 18px;
    width: 24px;
    text-align: center;
    color: var(--text-primary);
}
'''
css += new_css

with open('frontend/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
