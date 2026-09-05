with open('frontend/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_css = '''
/* ===== Dropdown Menu do Usuário (Fiel ao YouTube) ===== */
.usuario-logado__menu {
    display: none;
    position: absolute;
    top: 44px;
    right: 0;
    background-color: var(--bg-secondary) !important;
    border-radius: 12px !important;
    padding: 8px 0 !important;
    width: 300px !important;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5) !important;
    z-index: 50;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
}

[data-theme="light"] .usuario-logado__menu {
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1) !important;
}

.usuario-logado.aberto .usuario-logado__menu {
    display: block !important;
}

.menu-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 8px 16px 12px 16px;
}

.menu-header__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.menu-header__info {
    display: flex;
    flex-direction: column;
}

#nomeDoUsuario {
    color: var(--text-primary) !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    margin: 0 0 2px 0 !important;
}

#emailDoUsuario {
    color: var(--text-primary) !important;
    font-size: 14px !important;
    margin: 0 0 8px 0 !important;
}

.menu-header__link {
    color: #3ea6ff;
    font-size: 14px;
    text-decoration: none;
    font-weight: 500;
}

[data-theme="light"] .menu-header__link {
    color: #065fd4;
}

.menu-divisor {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 8px 0;
}

.menu-item {
    display: flex !important;
    align-items: center !important;
    padding: 0 16px 0 20px !important;
    height: 40px !important;
    cursor: pointer !important;
    color: var(--text-primary) !important;
    font-size: 14px !important;
    border-radius: 0 !important;
}

.menu-item:hover {
    background-color: var(--bg-hover) !important;
}

.menu-item i:first-child {
    font-size: 20px !important;
    width: 24px !important;
    margin-right: 16px !important;
    text-align: center !important;
    color: var(--text-primary) !important;
    font-weight: 300 !important;
}

.menu-item span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.menu-chevron {
    font-size: 14px !important;
    width: auto !important;
    margin-right: 0 !important;
}

/* Remove scrollbar invisível no menu */
.usuario-logado__menu::-webkit-scrollbar {
    width: 8px;
}
.usuario-logado__menu::-webkit-scrollbar-thumb {
    background: #717171;
    border-radius: 4px;
}
.usuario-logado__menu::-webkit-scrollbar-track {
    background: transparent;
}
'''
css += new_css

with open('frontend/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
