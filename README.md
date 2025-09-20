# OpenFGA Todo API

A complete REST API for managing todos with user authentication, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication system
- **Todo Management**: Full CRUD operations for todos
- **User-specific Todos**: Each user can only access their own todos
- **Data Validation**: Input validation and error handling
- **Security**: Protected routes with authentication middleware

## Project Structure

```
openFGA/
├── config/
│   ├── index.js          # Server configuration
│   └── dbConfig.js        # Database connection
├── controller/
│   ├── auth.controller.js # Authentication controllers
│   └── todo.controller.js # Todo controllers
├── middleware/
│   └── auth.middleware.js # JWT authentication middleware
├── models/
│   ├── user.js          # User model
│   └── todo.js            # Todo model
├── repository/
│   ├── user.repository.js # User data access layer
│   └── todo.repository.js # Todo data access layer
├── routes/
│   ├── auth.routes.js     # Authentication routes
│   └── todo.routes.js     # Todo routes
├── service/
│   ├── authService.js     # Authentication business logic
│   └── todoService.js     # Todo business logic
├── index.js               # Main application file
├── package.json           # Dependencies and scripts
└── test-todo-api.js       # API testing script
```

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:

   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/openfga
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=1h
   JWT_ISSUER=openfga
   JWT_AUDIENCE=openfga-clients
   ```

3. **Start the server:**
   ```bash
   node index.js
   ```

## API Endpoints

### Authentication Endpoints

#### Register User

- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login User

- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Todo Endpoints (All require authentication)

#### Get All Todos

- **GET** `/api/todos`
- **Headers:** `Authorization: Bearer <token>`

#### Create Todo

- **POST** `/api/todos`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Learn Node.js",
    "description": "Complete the Node.js tutorial",
    "priority": "high"
  }
  ```

#### Get Todo by ID

- **GET** `/api/todos/:id`
- **Headers:** `Authorization: Bearer <token>`

#### Update Todo

- **PUT** `/api/todos/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "completed": true,
    "priority": "medium"
  }
  ```

#### Delete Todo

- **DELETE** `/api/todos/:id`
- **Headers:** `Authorization: Bearer <token>`

## Todo Model Schema

```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  createdBy: ObjectId (ref: User, required),
  completed: Boolean (default: false),
  priority: String (enum: ["low", "medium", "high"], default: "medium"),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the API

1. **Start your server:**

   ```bash
   node index.js
   ```

2. **Run the test script:**
   ```bash
   node test-todo-api.js
   ```

The test script will:

- Register a new user
- Create todos
- Retrieve all todos
- Get a specific todo
- Update a todo
- Delete a todo
- Show final results

## Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Description of the result",
  "data": {} // Response data (if applicable)
}
```

## Error Handling

The API includes comprehensive error handling for:

- Missing authentication tokens
- Invalid JWT tokens
- Todo not found
- Permission denied (users can only access their own todos)
- Validation errors
- Database connection issues

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- User-specific data access
- Input validation and sanitization
- CORS enabled for cross-origin requests

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT token handling
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
