package rs.ac.metropolitan.financemanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.metropolitan.financemanager.domain.ExpenseStatisticByMonth;
import rs.ac.metropolitan.financemanager.domain.ExpenseStatisticByShop;
import rs.ac.metropolitan.financemanager.domain.ExpenseStatisticByYear;
import rs.ac.metropolitan.financemanager.repository.ExpenseRepository;

import java.time.Month;
import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ExpenseStatisticsController{
    private final ExpenseRepository expenseRepository;
    @GetMapping("/expense-statistic-by-shop")
    public ResponseEntity<Map<String, Double>> getExpenseStatisticByShop() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ExpenseStatisticByShop> expenseStatisticByShops = expenseRepository.getExpenseStatisticByShop(username);
        Map<String, Double> expenseStatisticByShop = new LinkedHashMap<>();
        for (ExpenseStatisticByShop expenseStatistic : expenseStatisticByShops) {
            expenseStatisticByShop.put(expenseStatistic.getShop(), expenseStatistic.getCost());
        }

        return ResponseEntity.ok(expenseStatisticByShop);
    }

    @GetMapping("/expense-statistic-by-year")
    public ResponseEntity<Map<String, Double>> getExpenseStatisticByYear() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ExpenseStatisticByYear> expenseStatisticByYears = expenseRepository.getExpenseStatisticByYear(username);
        Map<String, Double> expenseStatisticByYear = new LinkedHashMap<>();
        for (ExpenseStatisticByYear expenseStatistic : expenseStatisticByYears) {
            expenseStatisticByYear.put(expenseStatistic.getYear(), expenseStatistic.getCost());
        }

        return ResponseEntity.ok(expenseStatisticByYear);
    }

    @GetMapping("/expense-statistic-by-month")
    public ResponseEntity<Map<String, Double>> getExpenseStatisticByMonth() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Integer currentYear = OffsetDateTime.now().getYear();
        List<ExpenseStatisticByMonth> expenseStatisticByMonths = expenseRepository.getExpenseStatisticByMonth(username, currentYear);
        Map<String, Double> expenseStatisticByMonth = new LinkedHashMap<>();
        for (ExpenseStatisticByMonth expenseStatistic : expenseStatisticByMonths) {
            expenseStatisticByMonth.put(Month.of(expenseStatistic.getMonth()).toString(), expenseStatistic.getCost());
        }

        return ResponseEntity.ok(expenseStatisticByMonth);
    }
}
