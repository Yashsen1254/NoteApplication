const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/noteapp"

const connectToMongo = () => {
    mongoose.connect(mongoUri)
    console.log("Connected to MongoDB");
}

module.exports = connectToMongo;