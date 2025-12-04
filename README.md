# Full-Stack Contact Manager

A complete full-stack CRUD application built with **React**, **Express**, and **Node.js**.

## Features

- ✅ RESTful API with Express.js
- ✅ React frontend with modern minimalist UI
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Contact categorization (Work, Personal, Family, Friends, General)
- ✅ Category filtering and grouping
- ✅ Responsive design
- ✅ Form validation
- ✅ Real-time updates

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **React Scripts** - Build tools

## Project Structure

```
Exp 12/
├── backend/
│   ├── server.js          # Express server for local development
│   ├── index.js           # Serverless function for Vercel
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Minimalist styles
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   ├── .env.local        # Local environment variables
│   ├── .env.example      # Environment variables template
│   └── package.json      # Frontend dependencies
├── vercel.json           # Vercel deployment config
├── package.json          # Root build config
└── README.md
```

## Local Development Setup

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

3. Create environment file (optional for local dev):
```powershell
cp .env.example .env.local
```

4. Start the React development server:
```powershell
npm start
```

The frontend will run on **http://localhost:3000**

## Environment Variables

### Frontend (.env.local)

```env
# For local development (proxy to localhost:5000)
REACT_APP_API_URL=/api

# For production (use your deployed backend URL)
# REACT_APP_API_URL=https://your-backend.vercel.app/api
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Welcome message |
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/:id` | Get single contact |
| POST | `/api/contacts` | Create new contact |
| PUT | `/api/contacts/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |
| GET | `/api/categories` | Get all categories |

## 🚀 Deployment to Vercel

### Option 1: Separate Backend and Frontend (Recommended)

#### Step 1: Deploy Backend

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import repository: `https://github.com/SVSC07/Exp-12`
4. Configure project settings:
   - **Root Directory:** `backend`
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
5. Click **"Deploy"**
6. **Copy the deployed backend URL** (e.g., `https://exp-12-backend.vercel.app`)

#### Step 2: Deploy Frontend

1. Create another new project on Vercel
2. Import the same repository: `https://github.com/SVSC07/Exp-12`
3. Configure project settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. **Add Environment Variable:**
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend.vercel.app/api` (your backend URL + `/api`)
5. Click **"Deploy"**

### Important Notes for Separate Deployment:

- The frontend needs the `REACT_APP_API_URL` environment variable set to your backend URL
- Make sure to add `/api` at the end of your backend URL
- Example: If backend is `https://exp-12-backend.vercel.app`, set `REACT_APP_API_URL=https://exp-12-backend.vercel.app/api`

## Usage

1. **Start both servers** (backend and frontend)
2. **Open your browser** to http://localhost:3000
3. **Add new contacts** using the "Add Contact" button
4. **Filter by category** using the category tabs (All, Work, Personal, etc.)
5. **Edit contacts** by clicking the ✏️ icon
6. **Delete contacts** by clicking the 🗑️ icon
7. **View grouped contacts** when "All" category is selected

## Features in Detail

### Contact Management
- Add contacts with name, phone, email, and category
- Edit existing contacts
- Delete contacts with confirmation
- Form validation for required fields and email format

### Category System
- Pre-defined categories: General, Work, Personal, Family, Friends
- Filter contacts by category
- View contacts grouped by category
- Category count display

### User Interface
- Clean, minimalist design
- Responsive layout for mobile and desktop
- Smooth animations and transitions
- Icon-based actions for better UX
- Success/error message notifications

## License

MIT

## Author

Created for Web Design Lab - Experiment 12
