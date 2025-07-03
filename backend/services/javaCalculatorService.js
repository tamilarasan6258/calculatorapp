const { spawn } = require("child_process");


exports.calculate = (number1, number2, operation) => {
    return new Promise((resolve, reject) => {
        const java = spawn("java", ["-cp","../java-calculator","Calculator",number1,number2,operation]);

        // console.log(java);
        let output = "";
        java.stdout.on("data", (data) => {
            output += data.toString();
        });

        java.on("close", (code) => {
            if (code !== 0 || output.trim() === "Error") {
                return reject(new Error("Calculation error"));
            }

            const result = parseFloat(output.trim());
            resolve(result);
        });

        java.on("error", (err) => {
            reject(err);
        });
    });
};
