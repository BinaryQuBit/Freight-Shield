#!/bin/bash

./runDevelopment

cd ./Freigh-Shield

echo "Switching to the Production branch..."
git checkout Production

echo "Pulling the latest changes from the Production branch..."
git pull origin Production

echo "Adding changes from the backend directory..."
cd code/backend
git add .

echo "Committing the changes..."
git commit -m "Update backend with latest changes"

echo "Pushing changes to the Production branch..."
git push origin Production

echo "Changes pushed to the Production branch successfully."
