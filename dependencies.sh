#!/bin/bash

# Stocke le chemin du fichier de dépendances
dependencies_file="./dependencies.txt"

# Vérifie si le fichier de dépendances existe
if [ ! -f $dependencies_file ]; then
    echo "Dependencies file not found!"
    exit 1
fi

# Lis le fichier de dépendances et les install une par une
while read dependency; do
    npm install $dependency
done < $dependencies_file

echo "All dependencies have been installed successfully!"
