import re
with open('frontend/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

root_vars = '''
:root {
  --bg-primary: #0f0f0f;
  --bg-secondary: #272727;
  --bg-hover: #3f3f3f;
  --text-primary: #fff;
  --text-secondary: #aaa;
  --text-inverted: #0f0f0f;
  --border-color: #303030;
  --bg-chip: #272727;
  --bg-chip-ativo: #fff;
  --btn-login-bg: #263850;
  --btn-login-border: #3ea6ff;
  --btn-login-text: #3ea6ff;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f2f2f2;
  --bg-hover: #e5e5e5;
  --text-primary: #0f0f0f;
  --text-secondary: #606060;
  --text-inverted: #fff;
  --border-color: #cccccc;
  --bg-chip: #f2f2f2;
  --bg-chip-ativo: #0f0f0f;
  --btn-login-bg: #def1ff;
  --btn-login-border: #065fd4;
  --btn-login-text: #065fd4;
}

'''

css = root_vars + css

css = css.replace('background-color: #0f0f0f;', 'background-color: var(--bg-primary);')
css = css.replace('background-color: #272727;', 'background-color: var(--bg-secondary);')
css = css.replace('background-color: #3f3f3f;', 'background-color: var(--bg-hover);')
css = css.replace('background-color: #383838;', 'background-color: var(--bg-hover);')
css = css.replace('background-color: #222222;', 'background-color: var(--bg-secondary);')
css = css.replace('background-color: #181818;', 'background-color: var(--bg-primary);')

css = css.replace('color: #fff;', 'color: var(--text-primary);')
css = css.replace('color: #ffffff;', 'color: var(--text-primary);')
css = css.replace('color: #aaa;', 'color: var(--text-secondary);')
css = css.replace('color: #0f0f0f;', 'color: var(--text-inverted);')

css = css.replace('border: 1px solid #303030;', 'border: 1px solid var(--border-color);')
css = css.replace('border-top: 1px solid #303030;', 'border-top: 1px solid var(--border-color);')
css = css.replace('border-bottom: 1px solid #303030;', 'border-bottom: 1px solid var(--border-color);')

css = css.replace('background-color: #fff;', 'background-color: var(--text-primary);')
css = css.replace('background-color: #263850;', 'background-color: var(--btn-login-bg);')
css = css.replace('border: 1px solid #3ea6ff;', 'border: 1px solid var(--btn-login-border);')
css = css.replace('color: #3ea6ff;', 'color: var(--btn-login-text);')
css = css.replace('fill: #3ea6ff;', 'fill: var(--btn-login-text);')

with open('frontend/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
