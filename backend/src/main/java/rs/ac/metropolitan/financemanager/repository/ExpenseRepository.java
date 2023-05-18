package rs.ac.metropolitan.financemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.metropolitan.financemanager.domain.Expense;

import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    Optional<Expense> findByExpenseIdAndAndUser_Username(Integer expenseId, String username);
}
