#!/bin/bash

FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"
SOURCE_DIR="$FRONTEND_DIR/build"
DEST_DIR="$BACKEND_DIR/public/build"

echo "Installing frontend dependencies..."
cd "$FRONTEND_DIR"
npm install
if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully."
else
    echo "Error: Failed to install frontend dependencies."
    exit 1
fi

echo "Building the frontend..."
if npm run build; then
    echo "Frontend built successfully."
else
    echo "Error: Failed to build frontend."
    exit 1
fi

cd -

if [ -d "$SOURCE_DIR" ]; then
    echo "Copying build folder to backend..."
    rm -rf "$DEST_DIR"
    cp -R "$SOURCE_DIR" "$DEST_DIR"
    echo "Build folder copied successfully."
else
    echo "Error: Build directory does not exist."
    exit 1
fi

echo "Installing backend dependencies..."
cd "$BACKEND_DIR"
npm install
if [ $? -eq 0 ]; then
    echo "Backend dependencies installed successfully."
else
    echo "Error: Failed to install backend dependencies."
    exit 1
fi

echo "Adding changes from the backend directory..."
git add .

echo "Committing the changes..."
git commit -m "Update backend with latest changes"

echo "Switching to the Production branch..."
git checkout Production

echo "Adding changes from the backend directory..."
cd code/backend
git add .

echo "Committing the changes..."
git commit -m "Update backend with latest changes"

echo "Pushing changes to the Production branch..."
git push origin Production

echo "Changes pushed to the Production branch successfully."
