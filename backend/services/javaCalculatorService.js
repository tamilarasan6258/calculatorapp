const { spawn } = require("child_process");


exports.calculate = (expression) => {
  return new Promise((resolve, reject) => {
    // const java = spawn("java", ["-cp", "../java-calculator", "Calculator", expression]);
const java = spawn("java", [
  "-cp",
  "../java-calculator;../java-calculator/libs/exp4j-0.4.8.jar",
  "Calculator",
  expression
]);


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
