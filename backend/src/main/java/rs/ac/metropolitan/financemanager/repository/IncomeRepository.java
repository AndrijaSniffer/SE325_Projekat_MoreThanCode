package rs.ac.metropolitan.financemanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.metropolitan.financemanager.domain.Income;

import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Integer> {
    Page<Income> findAllByUser_Username(Pageable pageable, String username);

    Optional<Income> findByIncomeIdAndUser_Username(Integer incomeId, String username);

    Page<Income> findAllByUser_UsernameAndSource(Pageable pageable, String username, String source);
}
