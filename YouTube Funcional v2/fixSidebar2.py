import re

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

sidebar_new = '''          <aside class="sidebar" id="sidebar">
              <nav class="sidebar-secao">
                  <a  class="sidebar-item ativo" data-secao="inicio">
                      <i class="fa-solid fa-house"></i>
                      <span>Início</span>
                  </a>
                  <a  class="sidebar-item" data-secao="shorts">
                      <i class="fa-solid fa-bolt"></i>
                      <span>Shorts</span>
                  </a>
                  <a  class="sidebar-item" data-secao="inscricoes">
                      <i class="fa-brands fa-youtube"></i>
                      <span>Inscrições</span>
                  </a>
              </nav>

              <hr class="sidebar-divisor">

              <div class="sidebar-login" id="sidebarLogin">
                  <p>Faça login para curtir vídeos, comentar e se inscrever.</p>
                  <div id="containerLoginGoogleSidebar">
                      <button class="btn-login-custom" onclick="fazerLoginCompleto()">
                          <div class="img-circle">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G">
                          </div>
                          Fazer login
                      </button>
                  </div>
              </div>

              <!-- Seção Você (Mostrada quando logado) -->
              <nav class="sidebar-secao" id="sidebarVoceGroup" style="display:none;">
                  <a class="sidebar-item" data-secao="voce" id="btn-sidebar-voce" style="font-weight: 600; font-size: 16px;">
                      <span>Você</span>
                      <i class="fa-solid fa-chevron-right" style="font-size: 14px; margin-left: 8px;"></i>
                  </a>
                  <a class="sidebar-item" data-secao="voce">
                      <i class="fa-regular fa-id-badge"></i>
                      <span>Seu canal</span>
                  </a>
                  <a class="sidebar-item" data-secao="historico">
                      <i class="fa-solid fa-clock-rotate-left"></i>
                      <span>Histórico</span>
                  </a>
                  <a class="sidebar-item" data-toast="Playlists em breve.">
                      <i class="fa-solid fa-list-ul"></i>
                      <span>Playlists</span>
                  </a>
                  <a class="sidebar-item" data-toast="Assistir mais tarde em breve.">
                      <i class="fa-regular fa-clock"></i>
                      <span>Assistir mais tarde</span>
                  </a>
                  <a class="sidebar-item" data-toast="Vídeos marcados com Gostei em breve.">
                      <i class="fa-regular fa-thumbs-up"></i>
                      <span>Vídeos com "Gostei"</span>
                  </a>
                  <a class="sidebar-item" data-toast="Seus vídeos em breve.">
                      <i class="fa-regular fa-circle-play"></i>
                      <span>Seus vídeos</span>
                  </a>
                  <a class="sidebar-item" data-toast="Downloads não disponíveis.">
                      <i class="fa-solid fa-download"></i>
                      <span>Downloads</span>
                  </a>
              </nav>
              <hr class="sidebar-divisor" id="sidebarVoceDivisor" style="display:none;">

              <!-- Inscrições (Logado) -->
              <nav class="sidebar-secao" id="sidebarInscricoesGroup" style="display:none;">
                  <a class="sidebar-item" data-toast="Inscrições em breve." style="font-weight: 600; font-size: 16px;">
                      <span>Inscrições</span>
                      <i class="fa-solid fa-chevron-right" style="font-size: 14px; margin-left: 8px;"></i>
                  </a>
                  <a class="sidebar-item" data-toast="Acessar canal">
                      <img src="https://yt3.googleusercontent.com/ytc/AIdro_kX4h1f6FhS2k2Y3F4X2g2X2Y2X2Y2X2Y2X2Y2X=s88-c-k-c0x00ffffff-no-rj" class="sidebar-avatar" alt="C1">
                      <span>Harmonia Celeste ...</span>
                  </a>
                  <a class="sidebar-item" data-toast="Acessar canal">
                      <img src="https://yt3.googleusercontent.com/ytc/AIdro_kX4h1f6FhS2k2Y3F4X2g2X2Y2X2Y2X2Y2X2Y2X=s88-c-k-c0x00ffffff-no-rj" class="sidebar-avatar" alt="C2">
                      <span>Hinos CCB</span>
                      <span style="color: #3ea6ff; font-size: 24px; line-height: 0; margin-left: auto;">•</span>
                  </a>
                  <a class="sidebar-item" data-toast="Acessar canal">
                      <img src="https://yt3.googleusercontent.com/ytc/AIdro_kX4h1f6FhS2k2Y3F4X2g2X2Y2X2Y2X2Y2X2Y2X=s88-c-k-c0x00ffffff-no-rj" class="sidebar-avatar" alt="C3">
                      <span>Samuel Gabriel</span>
                      <span style="color: #3ea6ff; font-size: 24px; line-height: 0; margin-left: auto;">•</span>
                  </a>
                  <a class="sidebar-item" data-toast="Mais inscrições em breve.">
                      <i class="fa-solid fa-chevron-down"></i>
                      <span>Mostrar mais</span>
                  </a>
              </nav>
              <hr class="sidebar-divisor" id="sidebarInscricoesDivisor" style="display:none;">'''

# Substitui o sidebar
html = re.sub(r'<aside class="sidebar" id="sidebar">\s*<nav class="sidebar-secao">.*?</nav>\s*<hr class="sidebar-divisor">\s*<div class="sidebar-login" id="sidebarLogin">.*?</button>\s*</div>\s*</div>', sidebar_new, html, flags=re.DOTALL)

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
