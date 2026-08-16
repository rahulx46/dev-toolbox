/**
 * HTTP Status Code Constants
 * Standard HTTP status codes for consistent API responses.
 */

const HttpStatus = Object.freeze({

    // Success codes
    OK: 200,                       // Request successful
    CREATED: 201,                  // Resource created successfully
    ACCEPTED: 202,                 // Request accepted for processing
    NO_CONTENT: 204,               // Successful request, no response body
    PARTIAL_CONTENT: 206,          // Partial response
    MULTI_STATUS: 207,             // Multiple status codes in response


    // Client error codes
    BAD_REQUEST: 400,              // Invalid request / validation error
    UNAUTHORIZED: 401,             // Authentication required / invalid
    FORBIDDEN: 403,                // Authenticated but not allowed
    NOT_FOUND: 404,                // Resource not found
    METHOD_NOT_ALLOWED: 405,       // HTTP method not supported
    CONFLICT: 409,                 // Resource conflict / duplicate
    UNPROCESSABLE_ENTITY: 422,     // Request understood but validation failed
    TOO_MANY_REQUESTS: 429,        // Rate limit exceeded


    // Server error codes
    INTERNAL_SERVER_ERROR: 500,    // Generic server error
    NOT_IMPLEMENTED: 501,          // Server doesn't support functionality
    BAD_GATEWAY: 502,              // Invalid response from upstream server
    SERVICE_UNAVAILABLE: 503,      // Server/service temporarily unavailable
    GATEWAY_TIMEOUT: 504           // Upstream server timeout
});

module.exports = HttpStatus;