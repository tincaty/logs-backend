# admisssion-backendIncident & Operations Log System

A web-based Incident & Operations Log Management System designed to help organizations record, track, assign, update, and manage operational incidents efficiently. The system provides role-based access for administrators, operators, and reporters, ensuring accountability and streamlined incident handling workflows.

Features
Authentication & Authorization
Secure user authentication using JWT.
Role-based access control (Admin, Operator, Reporter).
Protected routes and permissions management.
Incident Management
Create and report incidents.
Assign incidents to operators.
Update incident status throughout its lifecycle.
Track incident history and activities.
Add comments and operational notes.
User Management
Manage users and roles.
View user profiles and assigned incidents.
Monitor user activities.
Incident Tracking
Real-time incident status monitoring.
Incident update logs.
Audit trail for accountability and reporting.
Dashboard & Reporting
Overview of incidents by status.
Assigned and resolved incident statistics.
Operational insights and monitoring.
Technology Stack
Frontend
React.js
TypeScript
Axios
React Router
Tailwind CSS
Backend
Node.js
Express.js
TypeScript
MongoDB
Mongoose
JWT Authentication
Deployment
Frontend: Netlify
Backend: Railway
Database: MongoDB Atlas
System Roles
Administrator
Manage users and permissions.
View all incidents.
Assign incidents to operators.
Monitor system activities.
Operator
View assigned incidents.
Update incident status.
Add comments and operational updates.
Resolve incidents.
Reporter
Create and submit incidents.
Track submitted incidents.
View incident updates.
Project Structure
logs-system/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
│
└── README.md
Installation
Clone Repository
git clone https://github.com/tincaty/logs-frontend.git
cd logs-frontend
Install Dependencies
npm install
Start Development Server
npm run dev
Environment Variables

Create a .env file and configure:

VITE_API_URL=http://localhost:9002/api

For backend:

PORT=9002
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Future Improvements
Email notifications
SMS alerts
Incident escalation workflows
File attachment support
Analytics and advanced reporting
Real-time notifications using WebSockets
Mobile application support
License

This project is developed for operational incident management, monitoring, and reporting purposes.

Author

Toma Nyange

GitHub: tincaty
