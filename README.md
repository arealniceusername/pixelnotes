# Pixel Notes App

A simple web application for creating and managing notes with a pixel-style interface. This project uses Node.js and Express for the backend, MongoDB (running in Docker) for the database, and vanilla HTML/CSS/JavaScript for the frontend.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

## Project Structure

```
pixel-notes-app/
├── backend/               # Express.js backend
│   ├── src/
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── app.js         # Main application file
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── docker-compose.yml # MongoDB container config
└── frontend/              # Static frontend
    ├── css/               # Stylesheets
    ├── js/                # JavaScript files
    └── index.html         # Main HTML page
```

## Installation

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd pixel-notes-app
```

### Step 2: Set up the backend

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB using Docker
docker-compose up -d

# Verify MongoDB is running
docker ps
```

### Step 3: Start the backend server

```bash
# From the backend directory
npm run dev
```

The backend server will start on http://localhost:3000

### Step 4: Set up the frontend

You can use any simple HTTP server to serve the frontend files. Here's how to do it with the `http-server` package:

```bash
# Install http-server globally if you don't have it
npm install -g http-server

# Navigate to the frontend directory
cd ../frontend

# Start the server
http-server -p 8080
```

The frontend will be available at http://localhost:8080

## MongoDB

This project uses MongoDB running in a Docker container for data storage. Here's what you need to know:

- MongoDB runs locally in a Docker container (not online)
- Data is stored in a Docker volume for persistence
- The container is configured in `backend/docker-compose.yml`
- The connection string is defined in `backend/.env`

### Managing MongoDB

```bash
# Start MongoDB container
cd backend
docker-compose up -d

# View container logs
docker logs pixel-notes-mongodb

# Stop MongoDB container
docker-compose down

# Stop MongoDB and remove data volume (CAUTION: deletes all data)
docker-compose down -v
```

## Development

### Backend

The backend uses the following major dependencies:
- Express.js - Web server framework
- Mongoose - MongoDB object modeling
- CORS - Cross-Origin Resource Sharing middleware
- dotenv - Environment variable management
- nodemon - Automatic server restart during development

To make changes to the backend:
1. Edit files in the `backend/src` directory
2. The server will automatically restart when files change

### Frontend

The frontend uses:
- Vanilla JavaScript - No frameworks
- CSS with pixel art styling
- "Press Start 2P" Google Font for the pixel text effect

To modify the frontend:
1. Edit files in the `frontend` directory
2. Refresh your browser to see changes

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Delete a note by ID

## Troubleshooting

### MongoDB connection issues

If the backend can't connect to MongoDB:

1. Check if the Docker container is running:
   ```bash
   docker ps
   ```

2. Verify the connection string in `.env` matches your Docker setup:
   ```
   MONGODB_URI=mongodb://root:password@localhost:27017/pixelnotes?authSource=admin
   ```

3. Check MongoDB container logs:
   ```bash
   docker logs pixel-notes-mongodb
   ```

### CORS issues

If the frontend can't communicate with the backend:

1. Ensure both servers are running
2. Check that the API URL in `frontend/js/main.js` matches your backend server:
   ```javascript
   const API_URL = 'http://localhost:3000/api/notes';
   ```

3. Verify that CORS middleware is enabled in the backend

## License

[MIT License](LICENSE)