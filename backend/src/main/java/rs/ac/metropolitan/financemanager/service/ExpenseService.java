package rs.ac.metropolitan.financemanager.service;

import rs.ac.metropolitan.financemanager.dto.ExpenseDto;
import rs.ac.metropolitan.financemanager.dto.ExpensePageDto;

public interface ExpenseService {
    ExpensePageDto getExpenses(String username, Integer pageNumber, Integer pageSize, String sort);
    ExpenseDto getExpenseDtoByExpenseId(Integer expenseId, String username);
    ExpenseDto saveExpense(ExpenseDto expense, String username);
    ExpenseDto updateExpense(Integer expenseId, ExpenseDto expenseDto);
    void deleteExpenseById(Integer expenseId);
}
