#!/bin/bash

# Navigate to the backend directory and install dependencies
cd backend
echo "Installing backend dependencies..."
npm install

# Navigate to the frontend directory and install dependencies
cd ../frontend
echo "Installing frontend dependencies..."
npm install

# Navigate back to the root directory
cd ..

# Start the backend server
echo "Starting backend server..."
cd backend
npm run start &
backend_pid=$!

# Start the frontend server
echo "Starting frontend server..."
cd ../frontend
npm run dev &
frontend_pid=$!

# Wait for both processes to complete
wait $backend_pid $frontend_pid
