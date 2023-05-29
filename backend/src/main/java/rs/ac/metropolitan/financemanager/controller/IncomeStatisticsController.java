package rs.ac.metropolitan.financemanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.metropolitan.financemanager.domain.*;
import rs.ac.metropolitan.financemanager.repository.ExpenseRepository;
import rs.ac.metropolitan.financemanager.repository.IncomeRepository;

import java.time.Month;
import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class IncomeStatisticsController implements IncomesStatisticsApi{
    private final IncomeRepository incomeRepository;
    @GetMapping("/income-statistic-by-source")
    public ResponseEntity<Map<String, Double>> getIncomeStatisticBySource() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<IncomeStatisticBySource> incomeStatisticBySources = incomeRepository.getIncomeStatisticBySource(username);
        Map<String, Double> incomeStatisticBySource = new LinkedHashMap<>();
        for (IncomeStatisticBySource incomeStatistic : incomeStatisticBySources) {
            incomeStatisticBySource.put(incomeStatistic.getSource(), incomeStatistic.getEarning());
        }

        return ResponseEntity.ok(incomeStatisticBySource);
    }

    @GetMapping("/income-statistic-by-year")
    public ResponseEntity<Map<String, Double>> getIncomeStatisticByYear() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<IncomeStatisticByYear> incomeStatisticByYears = incomeRepository.getIncomeStatisticByYear(username);
        Map<String, Double> incomeStatisticByYear = new LinkedHashMap<>();
        for (IncomeStatisticByYear incomeStatistic : incomeStatisticByYears) {
            incomeStatisticByYear.put(incomeStatistic.getYear(), incomeStatistic.getEarning());
        }

        return ResponseEntity.ok(incomeStatisticByYear);
    }

    @GetMapping("/income-statistic-by-month")
    public ResponseEntity<Map<String, Double>> getIncomeStatisticByMonth() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Integer currentYear = OffsetDateTime.now().getYear();
        List<IncomeStatisticByMonth> incomeStatisticByMonths = incomeRepository.getIncomeStatisticByMonth(username, currentYear);
        Map<String, Double> incomeStatisticByMonth = new LinkedHashMap<>();
        for (IncomeStatisticByMonth incomeStatistic : incomeStatisticByMonths) {
            incomeStatisticByMonth.put(Month.of(incomeStatistic.getMonth()).toString(), incomeStatistic.getEarning());
        }

        return ResponseEntity.ok(incomeStatisticByMonth);
    }
}
