package rs.ac.metropolitan.financemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import rs.ac.metropolitan.financemanager.domain.Expense;
import rs.ac.metropolitan.financemanager.domain.ExpenseStatisticByMonth;
import rs.ac.metropolitan.financemanager.domain.ExpenseStatisticByShop;
import rs.ac.metropolitan.financemanager.domain.ExpenseStatisticByYear;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    Page<Expense> findAllByUser_Username(Pageable pageable, String username);
    Page<Expense> findAllByUser_UsernameAndShop(Pageable pageable, String username, String shop);
    Optional<Expense> findByExpenseIdAndUser_Username(Integer expenseId, String username);

    @Query("SELECT expense.shop as shop, SUM(expense.cost) AS cost "
            + "FROM Expense AS expense WHERE expense.user.username = :username GROUP BY shop ORDER BY cost DESC")
    List<ExpenseStatisticByShop> getExpenseStatisticByShop(String username);

    @Query("SELECT YEAR(expense.date) as year, SUM(expense.cost) AS cost "
            + "FROM Expense AS expense WHERE expense.user.username = :username GROUP BY year ORDER BY cost DESC")
    List<ExpenseStatisticByYear> getExpenseStatisticByYear(String username);

    @Query("SELECT SUM(expense.cost) AS cost, MONTH(expense.date) as month "
            + "FROM Expense AS expense WHERE expense.user.username = :username AND YEAR(expense.date) = :year GROUP BY month order by MONTH(expense.date) ASC")
    List<ExpenseStatisticByMonth> getExpenseStatisticByMonth(String username, Integer year);

}
