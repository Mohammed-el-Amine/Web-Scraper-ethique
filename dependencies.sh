#!/bin/bash

# Store the dependencies file path
dependencies_file="./dependencies.txt"

# Check if the dependencies file exists
if [ ! -f $dependencies_file ]; then
    echo "Dependencies file not found!"
    exit 1
fi

# Read the dependencies file and install them one by one
while read dependency; do
    npm install $dependency
done < $dependencies_file

echo "All dependencies have been installed successfully!"
