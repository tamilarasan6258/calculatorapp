import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

public class Calculator {
    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Error");
            return;
        }

        String expressionStr = args[0];

        try {
            Expression expression = new ExpressionBuilder(expressionStr).build();
            double result = expression.evaluate();
            System.out.println(result);
        } catch (Exception e) {
            System.out.println("Error");
        }
    }
}
