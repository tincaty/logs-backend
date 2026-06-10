# Incident & Operations Log System - Backend

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB that powers the Incident & Operations Log System. The backend manages authentication, user roles, incident reporting, assignment workflows, status tracking, comments, and operational audit logs.

## Overview

The backend serves as the core business logic layer of the Incident & Operations Log System, providing secure APIs for managing incidents, users, comments, and operational updates. It ensures data integrity, role-based access control, and efficient incident lifecycle management.

## Features

### Authentication & Authorization

* JWT-based authentication.
* Secure login and user verification.
* Role-based access control (Admin, Operator, Reporter).
* Protected API endpoints.

### User Management

* Create and manage users.
* User profile management.
* Role assignment and permissions.
* User activity tracking.

### Incident Management

* Create new incidents.
* Retrieve incident records.
* Update incident information.
* Assign incidents to operators.
* Change incident statuses.
* Track incident lifecycle.

### Incident Updates

* Record incident status changes.
* Maintain audit trails.
* Store update history for accountability.
* Track who performed each action.

### Comments System

* Add comments to incidents.
* View incident discussions.
* Support operational communication between users.

### Database Integration

* MongoDB database management.
* Mongoose schema validation.
* Optimized data relationships and queries.

## Technology Stack

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### Development Tools

* Nodemon
* ts-node
* dotenv
* Debug

## API Modules

### Authentication

```text
POST /api/login/user
```

### Users

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

### Incidents

```text
GET    /api/incidents
GET    /api/incidents/:id
POST   /api/incidents
PUT    /api/incidents/:id
DELETE /api/incidents/:id
```

### Comments

```text
GET    /api/comments
POST   /api/comments
```

### Incident Updates

```text
GET    /api/incidentupdates
POST   /api/incidentupdates
```

## Installation

### Clone Repository

```bash
git clone https://github.com/tincaty/logs-backend.git
cd logs-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=9002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```text
src/
├── controller/
├── routes/
├── model/
├── middleware/
├── helper/
├── services/
├── database/
└── server.ts
```

## Security Features

* Password hashing using bcrypt.
* JWT token authentication.
* Protected routes and middleware.
* Request validation.
* Role-based authorization.

## Future Enhancements

* Email notifications.
* SMS alerts.
* File attachment support.
* Real-time notifications with WebSockets.
* Advanced analytics and reporting.
* Incident escalation workflows.
* API documentation with Swagger.

## Deployment

* Backend Hosting: Railway
* Database: MongoDB Atlas
* API Architecture: RESTful Services

## Author

Toma Nyange

GitHub: https://github.com/tincaty

## License

This project was developed to support operational incident reporting, tracking, monitoring, and management within organizations through a centralized and secure platform.
