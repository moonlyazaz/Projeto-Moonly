
const fs = require('fs');
let css = fs.readFileSync('frontend/style.css', 'utf8');

const rootVars = ':root {\\n' +
  '--bg-primary: #0f0f0f;\\n' +
  '--bg-secondary: #272727;\\n' +
  '--bg-hover: #3f3f3f;\\n' +
  '--text-primary: #fff;\\n' +
  '--text-secondary: #aaa;\\n' +
  '--text-inverted: #0f0f0f;\\n' +
  '--border-color: #303030;\\n' +
  '--bg-chip: #272727;\\n' +
  '--bg-chip-ativo: #fff;\\n' +
  '--btn-login-bg: #263850;\\n' +
  '--btn-login-border: #3ea6ff;\\n' +
  '--btn-login-text: #3ea6ff;\\n' +
'}\\n\\n' +
'[data-theme=\\'light\\'] {\\n' +
  '--bg-primary: #ffffff;\\n' +
  '--bg-secondary: #f2f2f2;\\n' +
  '--bg-hover: #e5e5e5;\\n' +
  '--text-primary: #0f0f0f;\\n' +
  '--text-secondary: #606060;\\n' +
  '--text-inverted: #fff;\\n' +
  '--border-color: #cccccc;\\n' +
  '--bg-chip: #f2f2f2;\\n' +
  '--bg-chip-ativo: #0f0f0f;\\n' +
  '--btn-login-bg: #def1ff;\\n' +
  '--btn-login-border: #065fd4;\\n' +
  '--btn-login-text: #065fd4;\\n' +
'}\\n';

css = rootVars + '\\n\\n' + css;

css = css.replace(/background-color: #0f0f0f;/g, 'background-color: var(--bg-primary);');
css = css.replace(/background-color: #272727;/g, 'background-color: var(--bg-secondary);');
css = css.replace(/background-color: #3f3f3f;/g, 'background-color: var(--bg-hover);');
css = css.replace(/background-color: #383838;/g, 'background-color: var(--bg-hover);');
css = css.replace(/background-color: #222222;/g, 'background-color: var(--bg-secondary);');
css = css.replace(/background-color: #181818;/g, 'background-color: var(--bg-primary);');

css = css.replace(/color: #fff;/g, 'color: var(--text-primary);');
css = css.replace(/color: #ffffff;/g, 'color: var(--text-primary);');
css = css.replace(/color: #aaa;/g, 'color: var(--text-secondary);');
css = css.replace(/color: #0f0f0f;/g, 'color: var(--text-inverted);');

css = css.replace(/border: 1px solid #303030;/g, 'border: 1px solid var(--border-color);');
css = css.replace(/border-top: 1px solid #303030;/g, 'border-top: 1px solid var(--border-color);');
css = css.replace(/border-bottom: 1px solid #303030;/g, 'border-bottom: 1px solid var(--border-color);');

css = css.replace(/background-color: #fff;/g, 'background-color: var(--text-primary);'); 
css = css.replace(/background-color: #263850;/g, 'background-color: var(--btn-login-bg);');
css = css.replace(/border: 1px solid #3ea6ff;/g, 'border: 1px solid var(--btn-login-border);');
css = css.replace(/color: #3ea6ff;/g, 'color: var(--btn-login-text);');
css = css.replace(/fill: #3ea6ff;/g, 'fill: var(--btn-login-text);');

fs.writeFileSync('frontend/style.css', css);

