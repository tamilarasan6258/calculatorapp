const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./db"); // connect to DB

const calculationRoutes = require("./routes/calculationRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", calculationRoutes);

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
