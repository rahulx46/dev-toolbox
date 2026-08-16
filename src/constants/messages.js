/**
 * Response Messages Constants
 * Standardized messages for API responses.
 */

const Messages = Object.freeze({

    // Success messages
    SUCCESS: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    FETCHED: 'Resource fetched successfully',


    // Tool-specific messages
    TOOL: {
        CREATED: 'Tool created successfully',
        UPDATED: 'Tool updated successfully',
        DELETED: 'Tool deleted successfully',
        FETCHED: 'Tool fetched successfully',
        NOT_FOUND: 'Tool not found',
        ALREADY_EXISTS: 'Tool with this name already exists',
        BULK_CREATED: 'Bulk operation completed',
        BULK_DELETED: 'Bulk deletion completed',
        POPULAR: 'Popular tools fetched successfully'
    },


    // Error messages
    ERROR: {
        INTERNAL: 'Internal server error',
        BAD_REQUEST: 'Bad request',
        UNAUTHORIZED: 'Unauthorized access',
        FORBIDDEN: 'Access forbidden',
        NOT_FOUND: 'Resource not found',
        VALIDATION_FAILED: 'Validation failed',
        INVALID_INPUT: 'Invalid input provided',
        INVALID_ID: 'Invalid ID format',
        REQUIRED_FIELD: 'Required field is missing',
        ARRAY_REQUIRED: 'Array input is required',
        INVALID_URL: 'Invalid URL provided',
        DUPLICATE_RESOURCE: 'Resource already exists',
        DATABASE_ERROR: 'Database operation failed'
    }
});

module.exports = Messages;