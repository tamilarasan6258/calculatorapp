public class Calculator {
    public static void main(String[] args) {
        if (args.length != 3) {
            System.out.println("Error");
            return;
        }

        double num1 = Double.parseDouble(args[0]);
        double num2 = Double.parseDouble(args[1]);
        String operation = args[2];

        double result = 0;

        switch (operation) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                if (num2 == 0) {
                    System.out.println("Error");
                    return;
                }
                result = num1 / num2;
                break;
            default:
                System.out.println("Error");
                return;
        }

        System.out.println(result);
    }
}
