// server/app.js
const express = require('express');
const connectDB = require('./config/db'); // Adjust the path if needed
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employee'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
