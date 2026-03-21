@echo off
REM ============================================================
REM  melhorias-alta-media-prioridade.bat
REM  Melhorias de alta e media prioridade — La Mirror
REM  Aplicado em: 2026-03-21
REM ============================================================

echo === ALTA PRIORIDADE ===
echo.
echo [SEO]
echo  + index.html  : JSON-LD LocalBusiness schema adicionado no head
echo  + produtos.html: JSON-LD CollectionPage schema adicionado
echo  + produtos.html: meta description e robots adicionados
echo  + robots.txt  : criado (Allow: /, Sitemap apontado)
echo  + sitemap.xml : criado com 6 URLs indexadas
echo.
echo [CARRINHO]
echo  + index.html  : cart-badge no botao do carrinho (id=cartBtn)
echo  + index.html  : cart drawer HTML adicionado (overlay + drawer)
echo  + styles.css  : estilos do cart drawer adicionados
echo  + script.js   : IIFE do carrinho com localStorage (lm_cart)
echo                  badge atualiza automaticamente
echo.
echo [WISHLIST]
echo  + produtos.js : toggleWish agora persiste em localStorage (lm_wishlist)
echo  + produtos.js : renderGrid inicializa botao com estado salvo (data-id)
echo.
echo [LINKS DO MENU]
echo  + index.html  : dropdown corrigido:
echo                   #espelhos -> produtos.html?cat=led
echo                   #espelhos -> produtos.html?cat=bisotado
echo                   #espelhos -> produtos.html?cat=decorativo
echo                   #ofertas  -> produtos.html?cat=oferta
echo.
echo === MEDIA PRIORIDADE ===
echo.
echo [PERFORMANCE]
echo  + index.html   : preconnect para fonts.googleapis.com e fonts.gstatic.com
echo  + produtos.html: preconnect para fonts.googleapis.com e fonts.gstatic.com
echo  + (font-display=swap ja estava na URL do Google Fonts)
echo.
echo [POPUP]
echo  + script.js   : sessionStorage -> localStorage (popup dispensado em todas as abas)
echo.
echo [BUSCA]
echo  + produtos.js : debounce de 300ms no searchInput (evita render a cada tecla)
echo.
echo [IMAGENS]
echo  + styles.css  : placeholder visual para cards com imagens faltando
echo.
echo Concluido. Nenhum arquivo de producao foi deletado.
pause
