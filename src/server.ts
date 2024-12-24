const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config'); // Import the config

const app = express();npm i cli

// Connect to MongoDB using the config file
mongoose.connect(config.mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`MongoDB connected in ${config.environment} mode`))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware for JSON parsing
app.use(express.json());

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.environment} mode`);
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
