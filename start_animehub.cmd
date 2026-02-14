@echo off
title AnimeHub Launcher
setlocal
cd /d "%~dp0"

:: 1. Kiem tra va cai dat thu vien neu thieu (se chay nhanh neu da co)
if not exist "node_modules\" (
    echo Dang chuan bi thu vien...
    call npm install
)

:: 2. Khoi dong server o che do thu nho (Minimized) de khong hien cua so den
:: Server se tiep tuc chay ngam
echo Dang khoi dong server...
start /min "" npm run dev

:: 3. Doi mot chut de server kip khoi dong truoc khi mo trinh duyet
timeout /t 3 /nobreak > nul

:: 4. Mo website tren trinh duyet
start "" "http://localhost:3000"

:: 5. Thoat cua so CMD nay
echo Hoan tat! Website dang duoc mo.
exit
