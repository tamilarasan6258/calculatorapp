const { spawn } = require("child_process");

/**
 * Calls the Java Calculator program with the given numbers and operation.
 * @param {number} number1 
 * @param {number} number2 
 * @param {string} operation 
 * @returns {Promise<number>} Resolves to the calculated result
 */
exports.calculate = (number1, number2, operation) => {
    return new Promise((resolve, reject) => {
        const java = spawn("java", ["-cp","../java-calculator","Calculator",number1,number2,operation]);

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
