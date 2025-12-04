# Full-Stack Web Application

A complete full-stack CRUD application built with **React**, **Express**, and **Node.js**.

## Features

- ✅ RESTful API with Express.js
- ✅ React frontend with modern UI
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Responsive design
- ✅ Form validation
- ✅ Real-time updates

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **React Scripts** - Build tools

## Project Structure

```
Exp 12/
├── backend/
│   ├── server.js          # Express server & API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styles
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   └── package.json      # Frontend dependencies
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the server:
```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

The backend server will run on **http://localhost:5000**

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the React development server:
```powershell
npm start
```

The frontend will run on **http://localhost:3000**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Welcome message |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get single item |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

## Usage

1. **Start both servers** (backend and frontend)
2. **Open your browser** to http://localhost:3000
3. **Add new items** using the form
4. **Edit items** by clicking the Edit button
5. **Delete items** by clicking the Delete button

## Development

### Backend Development
- The backend uses **nodemon** for auto-reload during development
- API routes are defined in `server.js`
- Data is stored in-memory (replace with a database for production)

### Frontend Development
- React development server provides hot-reload
- All API calls use Axios
- Proxy is configured to forward `/api` requests to the backend

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL, etc.)
- Implement user authentication
- Add input validation on backend
- Implement pagination
- Add search and filter functionality
- Deploy to cloud platform

## License

MIT

## Author

Created for Web Design Lab - Experiment 12
