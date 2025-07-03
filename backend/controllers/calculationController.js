const { spawn } = require("child_process");
const Calculation = require("../models/Calculation");

// POST /api/calculate
exports.calculate = (req, res) => {
    const { number1, number2, operation } = req.body;

    const java = spawn("java", ["-cp", "../java-calculator", "Calculator", number1, number2, operation]);

    let output = "";
    java.stdout.on("data", (data) => {
        output += data.toString();
    });

    java.on("close", async (code) => {
        if (code !== 0 || output.trim() === "Error") {
            return res.status(500).json({ error: "Calculation error" });
        }

        const result = parseFloat(output.trim());

        try {
            const record = new Calculation({
                number1,
                number2,
                operation,
                result
            });
            await record.save();
            res.json({ result });
        } catch (err) {
            console.error("❌ Error saving calculation:", err);
            res.status(500).json({ error: "Database error" });
        }
    });
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
