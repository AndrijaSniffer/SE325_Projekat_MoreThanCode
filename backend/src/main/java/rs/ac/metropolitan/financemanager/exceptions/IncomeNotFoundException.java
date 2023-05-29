package rs.ac.metropolitan.financemanager.exceptions;

public class IncomeNotFoundException extends RuntimeException{
    public IncomeNotFoundException(String message) {
        super(message);
    }
}
