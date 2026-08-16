const ToolService = require('../services/ToolService');
const  { Messages } = require('../constants');
const ApiResponse = require('../utils/ApiResponses');

class ToolController {
    constructor(toolService) {
        this.toolService = toolService;
    }

    /**
     * Retrieves all tools
     * @param {*} req 
     * @param {*} res 
     *  - /api/tools?category='Frontend'&popular=true&limit=10
     *  - /api/tools?category='Backend'&limit=10
     */
    getAllTools = async (req, res) => {

        // console.log("getAllTools called");
        // console.log("URL:", req.originalUrl);

        try {
            const {category, popular, search, limit, skip, sort} = req.query;

            const filters = {};
            if(category) filters.category = category;
            if(popular === 'true') filters.isPopular = true;

            const options = {};
            if(limit) options.limit = parseInt(limit);
            if(skip) options.skip = parseInt(skip);
            if(sort) options.sort = sort;
            
            let tools;

            if(search) {
                tools = await this.toolService.searchTools(search);
            }
            else {
                tools = await this.toolService.getAllTools(filters, options);
            }

            return ApiResponse.ok(res, tools, Messages.TOOL.FETCHED, { count: tools.length });

        } catch (error) {
            console.error(error);
            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

    getToolById = async (req, res) => {

        // console.log("getToolById called");
        // console.log("ID:", req.params.id);
        
        try {
            const { id } = req.params;
            const tool = await this.toolService.getToolById(id);

            return ApiResponse.ok(res, tool, Messages.TOOL.FETCHED, { count: 1 });
            
        } catch (error) {
            console.error(error);

            if (error.message.toLowerCase().includes('not found')) {
                return ApiResponse.notFound(res, Messages.TOOL.NOT_FOUND);
            }

            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

    createTool = async (req, res) => {
        try {
            const toolData = req.body;
            const tool = await this.toolService.createTool(toolData);

            return ApiResponse.created(res, tool, Messages.TOOL.CREATED);

        } catch (error) {
            console.error(error);
            if (error.message.toLowerCase().includes('already exists')) {
                return ApiResponse.conflict(res, Messages.TOOL.ALREADY_EXISTS);
            }
            if(error.message.toLowerCase().includes('validation')) {
                return ApiResponse.validationError(res, Messages.ERROR.VALIDATION_FAILED);
            }
            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

    createBulkTools = async (req, res) => {
        try {
            const { tools } = req.body;

            if (!Array.isArray(tools)) {
                return ApiResponse.badRequest(res, Messages.ERROR.ARRAY_REQUIRED);
            }

            const results = await this.toolService.createBulkTools(tools);

            if(results.failed.length > 0) {
                return ApiResponse.multiStatus(res, results, Messages.TOOL.BULK_CREATED, { created: results.created.length, failed: results.failed.length });
            }

            return ApiResponse.created(res, results, Messages.TOOL.BULK_CREATED);

        } catch (error) {
            console.error(error);
            return ApiResponse.internalServerError(res, Messages.ERROR.BULK_CREATE_FAILED);
        }
    }

    updateTool = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const tool = await this.toolService.updateTool(id, updateData);

            return ApiResponse.ok(res, tool, Messages.TOOL.UPDATED, { count: 1 });

        } catch (error) {
            console.error(error);

            if (error.message.toLowerCase().includes('not found')) {
                return ApiResponse.notFound(res, Messages.TOOL.NOT_FOUND);
            }

            if (error.name === 'ValidationError') {
                return ApiResponse.validationError(res, Messages.ERROR.VALIDATION_FAILED);
            }

            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

    deleteTool = async (req, res) => {
        try {
            const { id } = req.params;
            const tool = await this.toolService.deleteTool(id);

            return ApiResponse.ok(res, tool, Messages.TOOL.DELETED, { count: 1 });
            
        } catch (error) {
            console.error(error);
            if (error.message.toLowerCase().includes('not found')) {
                return ApiResponse.notFound(res, Messages.TOOL.NOT_FOUND);
            }
            
            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

    deleteBulkTools = async (req, res) => {
        try {
            const { ids } = req.body;

            if (!Array.isArray(ids)) {
                return ApiResponse.badRequest(res, Messages.ERROR.ARRAY_REQUIRED);
            }

            const results = await this.toolService.deleteBulkTools(ids);

            if(results.failed.length > 0) {
                return ApiResponse.multiStatus(res, results, Messages.TOOL.BULK_DELETED, { deleted: results.deleted.length, failed: results.failed.length });
            }

            return ApiResponse.ok(res, results, Messages.TOOL.BULK_DELETED, { deleted: results.deleted.length });
            
        } catch (error) {
            console.error(error);
            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

    getToolsByCategory = async (req, res) => {
        try {
            const { category } = req.params;
            const tools = await this.toolService.getToolsByCategory(category);

            return ApiResponse.ok(res, tools, Messages.TOOL.BY_CATEGORY, { count: tools.length });
            
        } catch (error) {
            console.error(error);
            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

    getPopularTools = async (req, res) => {
        try {
            const tools = await this.toolService.getPopularTools();

            return ApiResponse.ok(res, tools, Messages.TOOL.POPULAR, { count: tools.length });

        } catch (error) {
            console.error(error);
            return ApiResponse.internalServerError(res, Messages.ERROR.INTERNAL);
        }
    }

}

module.exports = ToolController;