#!/bin/bash
cd "$(dirname "$0")"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  LOLLY × PRIME STORE — App Next.js → GitHub      ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

rm -f .git/index.lock 2>/dev/null

if [ ! -d ".git" ]; then
  git init && git branch -m main
fi

git config user.email "oudama@lolly.sn"
git config user.name "LOLLY Communication"

# Tout le projet Next.js (node_modules et .next exclus via .gitignore)
git add .

git commit -m "LOLLY x PRIME — Next.js App (react-pdf + viewer 12 slides)" 2>/dev/null || echo "→ Rien de nouveau à commiter."

git remote remove origin 2>/dev/null
git remote add origin https://github.com/pumba-nakupenda/presentation.git

echo ""
echo "→ Push vers https://github.com/pumba-nakupenda/presentation.git"
echo ""
git push -u origin main

echo ""
echo "✅ Terminé ! Vérifie : https://github.com/pumba-nakupenda/presentation"
echo ""
read -p "Appuie sur Entrée pour fermer..."
