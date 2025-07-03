const Calculation = require("../models/Calculation");
const javaCalculatorService = require("../services/javaCalculatorService");

// POST /api/calculate
exports.calculate = async (req, res) => {
    const { number1, number2, operation } = req.body;

    try {
        const result = await javaCalculatorService.calculate(number1, number2, operation);

        const record = new Calculation({
            number1,
            number2,
            operation,
            result
        });
        await record.save();

        res.json({ result });
    } catch (err) {
        console.error("❌ Calculation error:", err);
        res.status(500).json({ error: err.message || "Calculation error" });
    }
};

// GET /api/history
exports.getHistory = async (req, res) => {
    try {
        const records = await Calculation.find().sort({ timestamp: -1 }).limit(10);
        res.json(records);
    } catch (err) {
        console.error("❌ Error fetching history:", err);
        res.status(500).json({ error: "Database error" });
    }
};
