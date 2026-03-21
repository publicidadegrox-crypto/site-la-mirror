@echo off
REM ============================================================
REM  upgrade-layout-ecommerce.bat
REM  Redesign visual — estilo e-commerce profissional
REM  Aplicado em: 2026-03-21
REM ============================================================

echo === NAVBAR DARK ===
echo  + background: rgba(10,10,10,0.97) com backdrop-filter blur
echo  + .scrolled: rgba(10,10,10,0.99) + sombra escura
echo  + border-bottom: rgba(255,255,255,0.07)
echo  + .nav-logo span: color white
echo  + .nav-links a: color rgba(255,255,255,0.62)
echo  + .nav-links a:hover: color white
echo  + .dropdown: background #141414 + border rgba branca
echo  + .dropdown a:hover: color gold
echo  + .icon-btn: color rgba(255,255,255,0.65)
echo  + .burger span: background rgba(255,255,255,0.8)
echo  + .mobile-menu: background #111111 + borders rgba branca
echo.
echo === BODY + SECOES ===
echo  + body background: #F4F1EC (cream quente — elimina branco puro)
echo  + .sec-bento:    #F4F1EC
echo  + .sec-espelhos: #EDE9E3
echo  + .sec-vidro:    #F4F1EC
echo  + .sec-contato:  #EDE9E3
echo  + .sec-faq:      #EDE9E3 (secao creme quente)
echo.
echo === SECOES DARK (alto contraste) ===
echo  + .sec-feedback: #0D0D0D
echo    - .fb-card: #181818 + border rgba branca
echo    - Todos os textos invertidos (white/rgba)
echo    - .fb-summary: #181818
echo  + .sec-como: #111111
echo    - .sec-title: white + em: gold-light
echo    - .sec-sub: rgba(255,255,255,0.45)
echo    - .como-step: #1A1A1A (cards escuros)
echo    - .como-step-body h4: white
echo    - .como-step-body p: rgba(255,255,255,0.45)
echo    - .como-step-arrow: bg #1A1A1A + border rgba branca
echo    - .como-grid separador: rgba(255,255,255,0.06)
echo.
echo Arquivo modificado: styles.css (apenas)
echo Nenhum HTML foi alterado.
pause
