"use strict";
const express = require("express");
const mongoose = require("mongoose");
const config = require('./config'); // Import the config
const app = express();
// Connect to MongoDB using the config file
mongoose.connect(config.mongodbURI)
    .then(() => console.log(`MongoDB connected in ${config.environment} mode`))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Middleware for JSON parsing
app.use(express.json());
// Start the server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.environment} mode`);
});
const userRoutes = require('./routes/api/users');
const thoughtRoutes = require('./routes/api/thoughts');
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    require('dotenv').config();
});
module.exports = config;
