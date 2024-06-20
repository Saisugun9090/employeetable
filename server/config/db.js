const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config(); // If not already required

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        // Seed initial user if not already exists
        const adminUser = await User.findOne({ userName: 'admin' });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            const newUser = new User({
                userName: 'admin',
                password: hashedPassword,
            });
            await newUser.save();
            console.log('Admin user created');
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
