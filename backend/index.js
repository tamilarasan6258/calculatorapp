const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");
const Calculation = require("./db");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/calculate", (req, res) => {
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
        const record = new Calculation({
            number1,
            number2,
            operation,
            result
        });

        await record.save();

        res.json({ result });
    });
});

app.get("/api/history", async (req, res) => {
    const records = await Calculation.find().sort({ timestamp: -1 }).limit(10);
    res.json(records);
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
