@echo off
REM ============================================================
REM  redesign-layout-profissional.bat
REM  Redesign completo inspirado em e-commerce de luxo
REM  Aplicado em: 2026-03-21
REM ============================================================

echo === TIPOGRAFIA ===
echo  + styles.css : font-sans atualizada de Poppins para Montserrat
echo  + index.html : Google Fonts atualizado (Montserrat 300-700)
echo.

echo === ANNOUNCE BAR — MARQUEE ===
echo  + index.html : HTML alterado para .announce-track com 2x spans (loop infinito)
echo  + styles.css : .announce-bar — overflow: hidden, sem justify-content
echo  + styles.css : .announce-track — display: flex, animation: lm-marquee 32s
echo  + styles.css : @keyframes lm-marquee — translateX(0) para translateX(-50%%)
echo  Resultado: ticker profissional estilo e-commerce de luxo
echo.

echo === COMO FUNCIONA — CORREÇÃO CRÍTICA ===
echo  + index.html : Seção completamente reescrita com classes corretas:
echo                 .como-inner, .como-header, .como-eyebrow
echo                 .como-steps, .como-step, .como-step-num
echo                 .como-step-icon, .como-step-body, .como-step-arrow
echo  Antes: HTML usava classes antigas sem CSS correspondente (layout quebrado)
echo  Depois: HTML alinhado com CSS v3 Premium existente (grid 4 colunas)
echo.

echo === RITMO VISUAL DAS SEÇÕES ===
echo  Fluxo de cores ANTES:
echo    Hero(dark) > Bento(cream) > Como(cream/quebrado) > Diferenciais(PRETO) >
echo    Feedback(cream/misto) > FAQ(cream) > Contato(cream) > Footer(dark)
echo.
echo  Fluxo de cores DEPOIS:
echo    Hero(dark) > Bento(BRANCO) > Como(cream) > Diferenciais(BRANCO) >
echo    Feedback(ESCURO) > FAQ(cream) > Contato(ESCURO) > Footer(dark)
echo  Resultado: alternancia elegante dark/light sem monotonia
echo.

echo === DIFERENCIAIS — de preto para branco ===
echo  + styles.css : .sec-diff-new — background: var(--black) -> var(--white)
echo  + styles.css : .diff-new-item — border: --border-dark -> --border
echo  + styles.css : .diff-new-text h4 — color: --white -> --black
echo  + styles.css : .diff-new-text p — color: rgba branco -> var(--gray)
echo  + styles.css : .diff-new-ico — adicionado background: --gold-bg permanente
echo  + styles.css : hover — background: --gold-bg com icon scale(1.08)
echo.

echo === FEEDBACK — seção dark elegante ===
echo  + styles.css : .sec-feedback — background: #F4F1EC -> #0F0F0F
echo  + styles.css : .sec-feedback .sec-eyebrow/title/sub — cores para white
echo  + styles.css : .fb-card — background: --white -> #1C1C1C, border dark
echo  + styles.css : .fb-card:hover — shadow dark + border gold
echo  + styles.css : .fb-text — color: --gray -> rgba(255,255,255,0.58)
echo  + styles.css : .fb-author — border-top dark, strong/span white
echo  + styles.css : .fb-sum-score — color: --black -> --white
echo  + styles.css : .fb-sum-label — color: --gray -> rgba branco
echo.

echo === CONTATO — fundo escuro ===
echo  + styles.css : .sec-contato — background: #EDE9E3 -> #0F0F0F
echo  + styles.css : .sec-contato h2/p — cores brancas
echo  + styles.css : .contato-info h3/p — cores brancas
echo  + styles.css : .info-list li — cor branca semitransparente
echo  + styles.css : .horario-box — fundo/borda dark com texto branco
echo  (formulario permanece branco — contraste elegante sobre fundo escuro)
echo.

echo === BENTO DESTAQUES ===
echo  + styles.css : .sec-bento — background: #F4F1EC -> #FFFFFF (mais limpo)
echo.

echo === ANIMAÇÕES REVEAL ===
echo  + styles.css : transition — cubic-bezier(0.16, 1, 0.3, 1) ease out spring
echo  + styles.css : translateY(28px) -> translateY(36px) (mais dramatico)
echo  + styles.css : nth-child delays: 0.08s / 0.16s / 0.24s (stagger suave)
echo.

echo Concluido. Abrir index.html no navegador para verificar.
pause
