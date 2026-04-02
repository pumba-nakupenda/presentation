#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 20 --silent
cd "/Users/oudama/Library/CloudStorage/SynologyDrive-LOLLY/Organisaton/01_PROJETS/CLIENTS/PRIME_STORE/002_APP_NEXTJS_REACTPDF"
exec npx next dev --webpack
