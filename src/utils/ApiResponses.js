const HttpStatus = require('./httpStatus');

class ApiResponse {
    static success(res, statusCode = HttpStatus.OK, message = 'Success', data = null, meta = null) {
        const response = {
            success = true,
            message,
            ...(data !== null && { data }),
            ...(meta !== null && { meta })
        };
        return res.statusCode(statusCode).json(response);
    }


    /**
     * Send a successful response
     *
     * @param {Object} res - Express response object
     * @param {Number} statusCode - HTTP status code
     * @param {String} message - Response message
     * @param {*} data - Response data
     * @param {Object} meta - Additional metadata
     */
    static success(
        res,
        statusCode = HttpStatus.OK,
        message = Messages.SUCCESS,
        data = null,
        meta = null
    ) {
        const response = {
            success: true,
            message,
            data
        };

        if (meta) {
            response.meta = meta;
        }

        return res.status(statusCode).json(response);
    }


    /**
     * Send a successful 200 response
     */
    static ok(
        res,
        data = null,
        message = Messages.FETCHED,
        meta = null
    ) {
        return this.success(
            res,
            HttpStatus.OK,
            message,
            data,
            meta
        );
    }


    /**
     * Send a created response (201)
     */
    static created(
        res,
        data = null,
        message = Messages.CREATED
    ) {
        return this.success(
            res,
            HttpStatus.CREATED,
            message,
            data
        );
    }


    /**
     * Send a no-content response (204)
     */
    static noContent(res) {
        return res.status(HttpStatus.NO_CONTENT).send();
    }


    /**
     * Send a multi-status response (207)
     */
    static multiStatus(
        res,
        data = null,
        message = 'Multi-status operation completed',
        meta = null
    ) {
        return this.success(
            res,
            HttpStatus.MULTI_STATUS,
            message,
            data,
            null
        );
    }


    /**
     * Send a paginated response
     *
     * @param {Object} res - Express response object
     * @param {Array} data - Response data
     * @param {Number} page - Current page
     * @param {Number} limit - Items per page
     * @param {Number} total - Total number of items
     * @param {String} message - Response message
     */
    static paginated(
        res,
        data,
        page,
        limit,
        total,
        message = Messages.FETCHED
    ) {
        const meta = {
            count: data.length,
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / limit)
        };

        return this.success(
            res,
            HttpStatus.OK,
            message,
            data,
            meta
        );
    }


    /**
     * Send an error response
     *
     * @param {Object} res - Express response object
     * @param {String} message - Error message
     * @param {Number} statusCode - HTTP status code
     * @param {*} errors - Additional error details
     */
    static error(
        res,
        message = Messages.ERROR.INTERNAL,
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
        errors = null
    ) {
        const response = {
            success: false,
            message,
            ...(errors !== null && { errors })
        };

        return res.status(statusCode).json(response);
    }


    /**
     * Send a bad request error (400)
     *
     * @param {Object} res - Express response object
     * @param {String} message - Error message
     * @param {*} errors - Validation errors
     */
    static badRequest(
        res,
        message = Messages.ERROR.BAD_REQUEST,
        errors = null
    ) {
        return this.error(
            res,
            message,
            HttpStatus.BAD_REQUEST,
            errors
        );
    }


    /**
     * Send an unauthorized error (401)
     */
    static unauthorized(
        res,
        message = Messages.ERROR.UNAUTHORIZED
    ) {
        return this.error(
            res,
            message,
            HttpStatus.UNAUTHORIZED
        );
    }


    /**
     * Send a forbidden error (403)
     */
    static forbidden(
        res,
        message = Messages.ERROR.FORBIDDEN
    ) {
        return this.error(
            res,
            message,
            HttpStatus.FORBIDDEN
        );
    }


    /**
     * Send a not found error (404)
     *
     * @param {Object} res - Express response object
     * @param {String} message - Error message
     */
    static notFound(
        res,
        message = Messages.ERROR.NOT_FOUND
    ) {
        return this.error(
            res,
            message,
            HttpStatus.NOT_FOUND
        );
    }


    /**
     * Send a conflict error (409)
     */
    static conflict(
        res,
        message = Messages.ERROR.DUPLICATE_RESOURCE
    ) {
        return this.error(
            res,
            message,
            HttpStatus.CONFLICT
        );
    }


    /**
     * Send a validation error (422)
     */
    static validationError(
        res,
        message = Messages.ERROR.VALIDATION_FAILED,
        errors = null
    ) {
        return this.error(
            res,
            message,
            HttpStatus.UNPROCESSABLE_ENTITY,
            errors
        );
    }


    /**
     * Send an internal server error (500)
     */
    static internalServerError(
        res,
        message = Messages.ERROR.INTERNAL,
        errors = null
    ) {
        return this.error(
            res,
            message,
            HttpStatus.INTERNAL_SERVER_ERROR,
            errors
        );
    }
}

module.exports = ApiResponse;
