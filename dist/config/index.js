require('dotenv').config(); // Load environment variables from .env file

const config = {
  environment: process.env.NODE_ENV || 'development', // Default to 'development' if NODE_ENV is not set
  port: process.env.PORT || 27107, // Default to port 3000 if not specified
  mongodbURI: process.env.MONGODB_URI || 'mongodb://localhost/socialNetwork', // Local DB as fallback
};

module.exports = config;
