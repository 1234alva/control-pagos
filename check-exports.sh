#!/bin/bash
echo "🔎 Validando exports en archivos de rutas..."

for file in backend/routes/*.js; do
  if grep -q "export default router" "$file"; then
    echo "✅ $file exporta correctamente"
  else
    echo "❌ $file NO exporta default"
  fi
done
