#!/bin/bash
echo "🔎 Comparando archivos locales vs contenedor..."

# Lista de rutas a verificar
FILES=("usuarios.js" "servicios.js" "pagos.js" "usuario_pagos.js" "auth.js")

for file in "${FILES[@]}"; do
  echo ""
  echo "📂 Revisando $file"

  echo "➡️ Local:"
  tail -n 5 backend/routes/$file

  echo "➡️ Contenedor:"
  docker-compose run --rm backend_api cat /app/routes/$file | tail -n 5
done

