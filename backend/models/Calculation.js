const mongoose = require("mongoose");

const CalculationSchema = new mongoose.Schema({
    number1: Number,
    number2: Number,
    operation: String,
    result: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Calculation", CalculationSchema);
