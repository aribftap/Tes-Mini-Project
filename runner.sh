#!/bin/bash

# Navigate to the backend directory and install dependencies
cd backend
echo "Installing backend dependencies..."
npm install

# Start the backend server
echo "Starting backend server..."
npm run start &
backend_pid=$!

# Navigate to the frontend directory and install dependencies
cd ../frontend
echo "Installing frontend dependencies..."
npm install

# Start the frontend server
echo "Starting frontend server..."
npm run dev &
frontend_pid=$!

# Wait for both processes to complete
wait $backend_pid $frontend_pid
