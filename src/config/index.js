require("dotenv").config();

const config = {
    port = process.env.port || 5000,

    mongodb: {
        url: process.env.MONGODB_CONNECT_URL,
    },

    api: {
        prefix: "/api",
        version: "v1"
    },

    cors: {
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true
    }
}

module.exports = config;