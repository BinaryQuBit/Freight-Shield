FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"

echo "Starting the setup for the frontend..."
cd "$FRONTEND_DIR" || exit
npm install
echo "Starting the frontend server..."
npm run start &

echo "Starting the setup for the backend..."
cd "$BACKEND_DIR" || exit
npm install
echo "Starting the backend server..."
npm run server &