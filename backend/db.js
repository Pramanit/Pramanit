
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the app if MongoDB connection fails
  }
};

module.exports = connectToDatabase;
