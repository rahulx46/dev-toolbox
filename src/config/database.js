const mongoose = require('mongoose');

class DatabaseConfig {
    static async connect() {
        try {
            const mongoURL = process.env.MONGODB_CONNECT_URL;

            if(!mongoURL) {
                throw new Error("MongoDB connection URL is not defined in environment variables.");
            }

            const options = {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            };

            await mongoose.connect(mongoURL, options)
            console.log("Connected to MongoDB");
            
        } catch (error) {
            console.log("Failes to connect to MongoDB:", error.message)
            process.exit(1);
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB");
        }
        catch (error){
            console.log("Failed to disconnect from MongoDB:", error);
        }
    }
}

module.exports = DatabaseConfig;