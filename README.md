# Dev Toolbox

A modular **backend service and REST API** for managing and discovering developer tools, built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project follows a layered backend architecture that separates HTTP handling, business logic, database access, and data modeling to keep the codebase maintainable and scalable.

## Features

- Developer tool management
- Search tools by name and description
- Filter tools by category
- Retrieve popular tools
- Pagination using `limit` and `skip`
- Sorting support
- Bulk tool creation
- Bulk tool deletion
- Mongoose schema validation
- Duplicate tool detection
- MongoDB indexing
- Centralized application configuration
- Modular route organization
- Service and repository architecture
- Structured API responses
- Error handling

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Backend and REST API framework
- **MongoDB** — Database
- **Mongoose** — MongoDB ODM and schema validation
- **Yarn** — Package manager
- **dotenv** — Environment variable management
- **CORS** — Cross-origin request handling

## Architecture

The application follows a layered backend architecture:

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Models
   │
   ▼
MongoDB
```

### Routes

Responsible for mapping incoming HTTP requests to the appropriate controller.

### Controllers

Handle HTTP-specific responsibilities such as request bodies, route parameters, query parameters, HTTP status codes, and API responses.

### Services

Contain application and business logic and coordinate operations between controllers and repositories.

### Repositories

Encapsulate database access and provide reusable data-access operations, keeping database-specific operations separate from business logic.

### Models

Define document structure, validation rules, indexes, timestamps, and Mongoose model behavior.

### Configuration

Centralizes environment variables, MongoDB connection settings, server configuration, CORS settings, and API configuration.

## Project Structure

```text
dev-toolbox/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── index.js
│   ├── controllers/
│   │   └── ToolController.js
│   ├── models/
│   │   └── tools.js
│   ├── repositories/
│   │   ├── BaseRepository.js
│   │   └── ToolRepository.js
│   ├── routes/
│   │   ├── index.route.js
│   │   └── toolbox.route.js
│   ├── services/
│   │   └── ToolService.js
│   ├── app.js
│   └── server.js
│
├── .editorconfig
├── .gitattributes
├── .gitignore
├── package.json
├── yarn.lock
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tools` | Retrieve all tools |
| `GET` | `/api/tools/popular` | Retrieve popular tools |
| `GET` | `/api/tools/category/:category` | Retrieve tools by category |
| `GET` | `/api/tools/:id` | Retrieve a tool by ID |
| `POST` | `/api/tools/create` | Create a new tool |
| `POST` | `/api/tools/create/bulk` | Create multiple tools |
| `PUT` | `/api/tools/:id` | Update a tool |
| `DELETE` | `/api/tools/delete/:id` | Delete a tool |
| `DELETE` | `/api/tools/delete/bulk` | Delete multiple tools |

## Query Parameters

### Filter by Category

```http
GET /api/tools?category=IDE
```

### Retrieve Popular Tools

```http
GET /api/tools?popular=true
```

### Search Tools

```http
GET /api/tools?search=database
```

### Pagination

```http
GET /api/tools?limit=10&skip=20
```

### Combined Filters

```http
GET /api/tools?category=IDE&popular=true&limit=10
```

## Tool Data Model

```json
{
  "name": "Postman",
  "description": "API development and testing platform",
  "category": "API_TOOL",
  "url": "https://www.postman.com",
  "isPopular": true,
  "tags": ["api", "testing", "development"]
}
```

### Supported Categories

```text
IDE
API_TOOL
VERSION_CONTROL
DATABASE
DESIGN
PRODUCTIVITY
OTHER
```

## Database

The application uses **MongoDB** with **Mongoose**.

The `Tool` model contains:

- `name`
- `description`
- `category`
- `url`
- `isPopular`
- `tags`
- `createdAt`
- `updatedAt`

Mongoose validation is used for required fields, string length limits, allowed categories, and URL format validation.

MongoDB indexes are defined for commonly queried fields to improve query performance.

## Repository Layer

The `BaseRepository` provides reusable database operations:

```text
findAll()
findById()
findOne()
create()
updateById()
deleteById()
count()
```

The feature-specific repository extends this functionality with operations specific to the `Tool` entity.

## SOLID and Design Principles

The project follows **Separation of Concerns** and applies principles from **SOLID**, particularly the **Single Responsibility Principle**.

```text
Routes
  ↓
Request routing

Controllers
  ↓
HTTP handling

Services
  ↓
Business logic

Repositories
  ↓
Database access

Models
  ↓
Data structure and validation
```

Each layer has a focused responsibility, making the codebase easier to understand, maintain, test, and extend.

## Request Flow

```text
HTTP Request
     │
     ▼
Express Middleware
     │
     ▼
Route
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
Mongoose Model
     │
     ▼
MongoDB
     │
     ▼
HTTP Response
```

## Configuration

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_CONNECT_URL=your_mongodb_connection_string
CORS_ORIGIN=*
```

Environment variables keep environment-specific configuration and database credentials outside the source code.

Make sure `.env` is included in `.gitignore` and is not committed to the repository.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Yarn

### Clone the Repository

```bash
git clone https://github.com/rahulx46/dev-toolbox.git
cd dev-toolbox
```

### Install Dependencies

```bash
yarn install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_CONNECT_URL=your_mongodb_connection_string
CORS_ORIGIN=*
```

### Run in Development

```bash
yarn dev
```

### Run in Production

```bash
yarn start
```

The backend will be available at:

```text
http://localhost:5000
```

## API Response Format

### Successful Single Resource Response

```json
{
  "success": true,
  "data": {
    "name": "Postman",
    "category": "API_TOOL"
  }
}
```

### Successful Collection Response

```json
{
  "success": true,
  "count": 2,
  "data": []
}
```

### Error Response

```json
{
  "success": false,
  "message": "Tool not found"
}
```

## HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| `200` | Successful request |
| `201` | Resource created |
| `400` | Invalid request |
| `404` | Resource not found |
| `500` | Internal server error |

## Author

**Rahul**

GitHub: https://github.com/rahulx46
