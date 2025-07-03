const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });
