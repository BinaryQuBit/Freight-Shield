#!/bin/bash

FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"
SOURCE_DIR="$FRONTEND_DIR/build"
DEST_DIR="$BACKEND_DIR/public"

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

    echo "Deleting the frontend build folder..."
    rm -rf "$SOURCE_DIR"
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "Frontend build folder deleted successfully."
    else
        echo "Error: Failed to delete frontend build folder."
        exit 1
    fi
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

echo "Committing all current changes to the main branch..."
git add .
git commit -m "Update frontend and backend with latest changes"
git push origin main

echo "Switching to the Production branch..."
git checkout Production

echo "Pulling changes from the main branch..."
git fetch origin main:main
git merge main --no-edit

echo "Removing .gitignore from the cache..."
git rm --cached .gitignore

echo "Stashing .gitignore to prevent it from being overwritten..."
git stash push -m "Stash .gitignore" .gitignore

echo "Accepting all incoming changes except for .gitignore..."
git checkout --theirs .
git checkout HEAD .gitignore

echo "Restoring .gitignore from the stash..."
git stash pop

echo "Adding and committing merged changes..."
git add .
git commit -m "Merge main into Production and resolve conflicts"

echo "Pushing changes to the Production branch..."
git push origin Production

echo "Changes pushed to the Production branch successfully."

