const app = require('./app');
const config = require('./config');
const DatabaseConfig = require('./config/database');

const startServer = async () => {
    try {
        await DatabaseConfig.connect(); 

        app.listen(config.port, () => {
            console.log("Server Started on port", config.port);
        })

    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();