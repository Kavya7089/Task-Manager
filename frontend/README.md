# TaskFlow - MERN Stack Task Manager

A beautiful, full-featured task management application built with the MERN stack (MySQL, Express, React, Node.js).

## Features

- **User Authentication**: JWT-based signup/login with bcrypt password hashing
- **Task Management**: Create, read, update, and delete tasks
- **Status Tracking**: Three-column Kanban board (To Do, In Progress, Done)
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Responsive Design**: Beautiful UI that works on all devices
- **Secure API**: Protected routes with JWT middleware

## Tech Stack

### Frontend
- **React.js** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Sequelize** - SQL ORM
- **MySQL** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## Database Schema

### Users Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR(50), NOT NULL)
- email (VARCHAR(255), UNIQUE, NOT NULL)
- password (VARCHAR(100), NOT NULL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tasks Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- title (VARCHAR(255), NOT NULL)
- status (ENUM: 'todo', 'in_progress', 'done')
- user_id (INT, FOREIGN KEY)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a MySQL database named `task_manager`
   - Update database credentials in `.env` file

4. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=task_manager
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend (port 5173).

### Manual Setup (Alternative)

If you prefer to run frontend and backend separately:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run client
```

## Usage

1. **Sign Up**: Create a new account with name, email, and password
2. **Sign In**: Login with your credentials
3. **Add Tasks**: Click "Add new task" to create tasks
4. **Manage Tasks**: 
   - Edit task titles by clicking the edit icon
   - Move tasks between columns using status buttons
   - Delete tasks using the trash icon
5. **Sign Out**: Use the sign out button in the header

## Task Status Flow

```
To Do → In Progress → Done
```

Tasks can move forward or backward through these statuses.

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- SQL injection prevention with Sequelize ORM

## Development

### Project Structure
```
├── server/
│   ├── config/database.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── App.jsx
└── package.json
```

### Available Scripts
- `npm run dev` - Start both frontend and backend
- `npm run client` - Start frontend only
- `npm run server` - Start backend only
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Deployment

The application is ready for deployment on platforms like:
- **Frontend**: Vercel, Netlify
- **Backend**: Render, Railway, Heroku
- **Database**: PlanetScale, Railway, AWS RDS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.