const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRoutes = require('./routes/api/users');
const thoughtRoutes = require('./routes/api/thoughts');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  require('dotenv').config();

});
