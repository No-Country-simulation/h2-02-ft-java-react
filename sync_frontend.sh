#!/bin/bash
# Sincroniza solo la carpeta frontend

# Clona el repositorio de la organización
git clone -b develop https://github.com/No-Country-simulation/h2-02-ft-java-react.git repo-temp
cd repo-temp

# Copia la carpeta frontend a un directorio temporal
cp -r frontend ../frontend-temp

# Navega al directorio temporal
cd ../frontend-temp

# Inicializa un nuevo repositorio y empuja los cambios
git init
git remote add origin https://github.com/mateok13/wakiFront-deploy.git
git add .
git commit -m "Sync frontend from organization repo"
git push -u origin main --force

# Limpia los directorios temporales
cd ..
rm -rf repo-temp frontend-temp
