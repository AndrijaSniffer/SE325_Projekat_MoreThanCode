package rs.ac.metropolitan.financemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import rs.ac.metropolitan.financemanager.domain.*;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Integer> {
    Page<Income> findAllByUser_Username(Pageable pageable, String username);

    Optional<Income> findByIncomeIdAndUser_Username(Integer incomeId, String username);

    Page<Income> findAllByUser_UsernameAndSource(Pageable pageable, String username, String source);

    @Query("SELECT income.source as source, SUM(income.earning) AS earning "
            + "FROM Income AS income WHERE income.user.username = :username GROUP BY source ORDER BY earning DESC")
    List<IncomeStatisticBySource> getIncomeStatisticBySource(String username);

    @Query("SELECT YEAR(income.date) as year, SUM(income.earning) AS earning "
            + "FROM Income AS income WHERE income.user.username = :username GROUP BY year ORDER BY earning DESC")
    List<IncomeStatisticByYear> getIncomeStatisticByYear(String username);

    @Query("SELECT SUM(income.earning) AS earning, MONTH(income.date) as month "
            + "FROM Income AS income WHERE income.user.username = :username AND YEAR(income.date) = :year GROUP BY month order by MONTH(income.date) ASC")
    List<IncomeStatisticByMonth> getIncomeStatisticByMonth(String username, Integer year);
}
