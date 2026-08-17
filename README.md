# Dev Toolbox

A modular **backend service and REST API** for managing and discovering developer tools, built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project follows a layered backend architecture that separates HTTP handling, business logic, database access, and data modeling. Dependencies are injected between layers to reduce coupling and make individual components easier to test, maintain, and replace.

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
- Constructor-based dependency injection
- Structured API responses
- Standardized HTTP status handling
- Error handling
- k6 load and performance testing

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Backend and REST API framework
- **MongoDB** — Database
- **Mongoose** — MongoDB ODM and schema validation
- **Yarn** — Package manager
- **dotenv** — Environment variable management
- **CORS** — Cross-origin request handling
- **k6** — API load and performance testing

## Architecture

The application follows a layered backend architecture:

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

### Routes

Responsible for mapping incoming HTTP requests to the appropriate controller.

Routes focus only on request routing and do not contain business or database logic.

### Controllers

Handle HTTP-specific responsibilities such as:

- Request bodies
- Route parameters
- Query parameters
- Calling application services
- HTTP status codes
- API responses
- Controller-level error handling

Controllers do not directly perform database operations.

### Services

Contain application and business logic.

The service layer coordinates operations between controllers and repositories and is responsible for rules such as duplicate detection and bulk operations.

### Repositories

Encapsulate database access and provide reusable data-access operations.

Repositories keep database-specific operations separate from application and business logic.

### Models

Define the structure and behavior of MongoDB documents using Mongoose.

Models contain:

- Schema definitions
- Validation rules
- Indexes
- Timestamps
- Mongoose middleware
- Model-level helper methods

### Configuration

Centralizes environment variables and application configuration such as:

- Server port
- MongoDB connection URL
- API prefix
- API version
- CORS configuration

## Dependency Injection

The project uses **constructor-based dependency injection** to reduce coupling between layers.

Instead of a class creating its dependency internally:

    class ToolController {
        constructor() {
            this.toolService = new ToolService();
        }
    }

The dependency is provided from outside:

    class ToolController {
        constructor(toolService) {
            this.toolService = toolService;
        }
    }

This allows components to be:

- Tested independently
- Replaced with alternative implementations
- Maintained more easily
- Less tightly coupled to concrete implementations

The same dependency injection approach is applied across the relevant layers of the application.

## Project Structure

    dev-toolbox/
    │
    ├── src/
    │   ├── config/
    │   │   ├── database.js
    │   │   └── index.js
    │   │
    │   ├── constants/
    │   │   ├── HttpStatus.js
    │   │   └── Messages.js
    │   │
    │   ├── controllers/
    │   │   └── ToolController.js
    │   │
    │   ├── models/
    │   │   └── Tools.js
    │   │
    │   ├── repositories/
    │   │   ├── BaseRepository.js
    │   │   └── ToolRepository.js
    │   │
    │   ├── routes/
    │   │   ├── index.route.js
    │   │   └── toolbox.route.js
    │   │
    │   ├── services/
    │   │   └── ToolService.js
    │   │
    │   ├── tests/
    │   │   └── load/
    │   │       └── tools.load.js
    │   │
    │   ├── utils/
    │   │   └── ApiResponses.js
    │   │
    │   ├── app.js
    │   └── server.js
    │
    ├── .editorconfig
    ├── .gitattributes
    ├── .gitignore
    ├── package.json
    ├── yarn.lock
    └── README.md

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

    GET /api/tools?category=IDE

### Retrieve Popular Tools

    GET /api/tools?popular=true

### Search Tools

    GET /api/tools?search=database

### Pagination

    GET /api/tools?limit=10&skip=20

### Sorting

    GET /api/tools?sort=name

### Combined Filters

    GET /api/tools?category=IDE&popular=true&limit=10&sort=name

## Tool Data Model

    {
      "name": "Postman",
      "description": "API development and testing platform",
      "category": "API_TOOL",
      "url": "https://www.postman.com",
      "isPopular": true,
      "tags": [
        "api",
        "testing",
        "development"
      ]
    }

### Supported Categories

    IDE
    API_TOOL
    VERSION_CONTROL
    DATABASE
    DESIGN
    PRODUCTIVITY
    OTHER

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

Mongoose validation is used for:

- Required fields
- String length limits
- Allowed categories
- URL format validation
- Default values

MongoDB indexes are defined for commonly queried fields to improve query performance.

The project also uses Mongoose features such as:

- Schema middleware
- Timestamps
- Static model methods
- Validation
- Indexing

## Repository Layer

The repository layer abstracts database operations from the service layer.

### BaseRepository

The `BaseRepository` provides reusable database operations:

    findAll()
    findById()
    findOne()
    create()
    updateById()
    deleteById()
    count()

This allows common database operations to be reused across different entities.

### ToolRepository

The feature-specific repository extends the base repository with operations specific to the `Tool` entity.

This keeps entity-specific database queries inside the repository layer instead of placing them inside services or controllers.

## API Response Handling

The project uses a centralized `ApiResponse` utility to maintain consistent API response structures.

The utility provides standardized methods for successful responses and errors.

### Success Responses

- `success()`
- `ok()`
- `created()`
- `noContent()`
- `multiStatus()`
- `paginated()`

### Error Responses

- `error()`
- `badRequest()`
- `unauthorized()`
- `forbidden()`
- `notFound()`
- `conflict()`
- `validationError()`
- `internalServerError()`

This prevents controllers from repeatedly constructing response objects and keeps API responses consistent.

## API Response Format

### Successful Single Resource Response

    {
      "success": true,
      "message": "Tool fetched successfully",
      "data": {
        "name": "Postman",
        "category": "API_TOOL"
      }
    }

### Successful Collection Response

    {
      "success": true,
      "message": "Tools fetched successfully",
      "data": [
        {
          "name": "Postman",
          "category": "API_TOOL"
        }
      ],
      "meta": {
        "count": 1
      }
    }

### Error Response

    {
      "success": false,
      "message": "Tool not found"
    }

## HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| `200` | Successful request |
| `201` | Resource created |
| `204` | Successful request with no response body |
| `207` | Multi-status response for partially successful bulk operations |
| `400` | Invalid request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Resource not found |
| `409` | Resource conflict or duplicate |
| `422` | Validation error |
| `500` | Internal server error |

## Performance Testing

The API includes a **k6 load test** for evaluating REST API performance under concurrent workloads.

The load test measures:

- Request throughput
- Response latency
- p95 latency
- HTTP request failure rate
- Response status checks
- Performance under increasing concurrent users

### Load Test

The test targets the tools API:

    GET /api/tools?category=API_TOOL

The base URL can be configured using the `BASE_URL` environment variable.

Run the test against the local server:

    k6 run ./src/tests/load/tools.load.js

Or specify a custom API URL:

    k6 run -e BASE_URL=http://localhost:5000 ./src/tests/load/tools.load.js

The test uses virtual users (VUs) to simulate concurrent clients and continuously sends requests for the configured test duration.

### Example Test Configuration

    export const options = {
        vus: 100,
        duration: '30s',
    };

This configuration runs the test with 100 concurrent virtual users for 30 seconds.

The test verifies that API requests return HTTP `200` responses while k6 collects performance metrics such as throughput, response duration, and failure rate.

## SOLID and Design Principles

The project follows **Separation of Concerns** and applies relevant **SOLID principles**, particularly the **Single Responsibility Principle (SRP)** and **Dependency Inversion Principle (DIP)**.

### Single Responsibility Principle

Each layer has a focused responsibility:

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

This keeps responsibilities separated and makes the codebase easier to understand, maintain, and test.

### Dependency Inversion Principle

Dependencies are provided to classes through constructors instead of being instantiated directly inside them.

Example:

    class ToolController {
        constructor(toolService) {
            this.toolService = toolService;
        }
    }

This reduces direct coupling to concrete implementations and makes dependencies easier to replace during testing or future changes.

## Request Flow

A typical request flows through the application as follows:

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
    Repository
         │
         ▼
    Service
         │
         ▼
    Controller
         │
         ▼
    ApiResponse
         │
         ▼
    HTTP Response

## Error Handling

The controller layer maps application errors to appropriate HTTP responses.

    Invalid request
          ↓
        400

    Resource not found
          ↓
        404

    Duplicate resource
          ↓
        409

    Validation failure
          ↓
        422

    Unexpected server/database error
          ↓
        500

Bulk operations can return `207 Multi-Status` when some operations succeed while others fail.

Internal errors are logged on the server while the API returns a standardized error response to the client.

## Configuration

Create a `.env` file in the project root:

    PORT=5000
    MONGODB_CONNECT_URL=your_mongodb_connection_string
    CORS_ORIGIN=*

Environment variables keep environment-specific configuration and database credentials outside the source code.

Make sure `.env` is included in `.gitignore` and is not committed to the repository.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Yarn
- k6 (only required for performance testing)

### Clone the Repository

    git clone https://github.com/rahulx46/dev-toolbox.git
    cd dev-toolbox

### Install Dependencies

    yarn install

### Configure Environment Variables

Create a `.env` file in the project root:

    PORT=5000
    MONGODB_CONNECT_URL=your_mongodb_connection_string
    CORS_ORIGIN=*

### Run in Development

    yarn dev

### Run in Production

    yarn start

The backend will be available at:

    http://localhost:5000

## Example Request

### Create a Tool

    POST /api/tools/create
    Content-Type: application/json

Request body:

    {
      "name": "Postman",
      "description": "API development and testing platform",
      "category": "API_TOOL",
      "url": "https://www.postman.com",
      "isPopular": true,
      "tags": [
        "api",
        "testing"
      ]
    }

Example response:

    {
      "success": true,
      "message": "Tool created successfully",
      "data": {
        "name": "Postman",
        "description": "API development and testing platform",
        "category": "API_TOOL",
        "url": "https://www.postman.com",
        "isPopular": true,
        "tags": [
          "api",
          "testing"
        ]
      }
    }

## Author

**Rahul**

GitHub: https://github.com/rahulx46