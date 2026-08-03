const mongoose = require('mongoose');
const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tool name required."],
        trim: true,
        maxLength: [100, 'Tool name cannot exceed 100 characters.']
    },

    description: {
        type: String,
        required: [true, "Tool description required."],
        trim: true,
        maxLength: [500, 'Tool description cannot exceed 500 characters.']
    },

    category: {
        type: String,
        required: [true, "Tool category required."],
        enum: {
            values: ['IDE', 'API_TOOL', 'VERSION_CONTROL', 'DATABASE', 'DESIGN', 'PRODUCTIVITY', 'OTHER'],
            message: 'Tool category invalid.'
        }
    },

    url: {
        type: String,
        required: [true, "Tool URL required."],
        validate: {
            validator: function (url) {
                return /^https?:\/\/.+/.test(url);
            },
            message: 'Please enter a valid URL starting with http:// or https://'
        }
    },

    isPopular: {
        type: Boolean,
        default: false
    },

    tags: [{
        type: String,
        trim: true
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

// Indexing
toolSchema.index({ category: 1, isPopular: -1 })
toolSchema.index({ name: 1 })

// Middleware
toolSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
})

// Helpers
toolSchema.statics.findPopular = function (){
    return this.find({ isPopular: true }).sort({ createdAt: -1});
}

toolSchema.statics.findByCategory = function (category) {
    return this.find({ category }).sort({ name: 1 });
}

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
