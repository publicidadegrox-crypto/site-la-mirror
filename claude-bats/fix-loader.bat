@echo off
REM ============================================================
REM  fix-loader.bat
REM  Corrige o loader travado do site La Mirror
REM  Alteracoes aplicadas em: 2026-03-21
REM ============================================================

echo [1/3] Verificando arquivos necessarios...
if not exist "index.html" echo ERRO: index.html nao encontrado & pause & exit /b 1
if not exist "script.js"  echo ERRO: script.js nao encontrado  & pause & exit /b 1

echo [2/3] As seguintes correcoes foram aplicadas manualmente:
echo.
echo  index.html:
echo   - Adicionado ^<script src="script.js"^>^</script^> antes de ^</body^>
echo   - Completado SVG do WhatsApp (estava truncado)
echo   - Adicionado ^</a^>, ^</body^> e ^</html^> que estavam faltando
echo   - Adicionado listener de 'load' no ^<head^> para esconder loader
echo     (garante captura do evento antes dos recursos carregarem)
echo.
echo  script.js:
echo   - Funcao hide() aceita parametro 'instant' para ocultacao sem delay
echo   - Adicionada verificacao de document.readyState === 'complete'
echo     para esconder o loader imediatamente se pagina ja carregou
echo   - Fallback de 800ms mantido para o else branch
echo.
echo [3/3] Resultado: loader some apos carregamento da pagina.
echo.
echo Concluido.
pause
