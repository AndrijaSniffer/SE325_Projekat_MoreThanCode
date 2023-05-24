package rs.ac.metropolitan.financemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.metropolitan.financemanager.domain.Expense;

import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    Page<Expense> findAllByUser_Username(Pageable pageable, String username);
    Page<Expense> findAllByUser_UsernameAndShop(Pageable pageable, String username, String shop);

    Optional<Expense> findByExpenseIdAndUser_Username(Integer expenseId, String username);
}
