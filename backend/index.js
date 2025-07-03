const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db"); // connect to DB

const calculationRoutes = require("./routes/calculationRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", calculationRoutes);

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
