public class Calculator {
    public static void main(String[] args) {
        if (args.length != 3) {
            System.out.println("Error");
            return;
        }
        double n1 = Double.parseDouble(args[0]);
        double n2 = Double.parseDouble(args[1]);
        String op = args[2];
        double res = 0;
        if (op.equals("add")) {
            res = n1 + n2;
        } else if (op.equals("subtract")) {
            res = n1 - n2;
        } else {
            System.out.println("Error");
            return;
        }
        System.out.println(res);
    }
}
