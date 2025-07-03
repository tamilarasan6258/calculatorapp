const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sstamilarasan14:KJfPa9sbKTMN5tNB@cluster0.gzuqqns.mongodb.net/calculator?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });
