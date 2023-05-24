package rs.ac.metropolitan.financemanager.service;

import rs.ac.metropolitan.financemanager.dto.ExpenseDto;
import rs.ac.metropolitan.financemanager.dto.ExpensePageDto;
import rs.ac.metropolitan.financemanager.dto.IncomeDto;
import rs.ac.metropolitan.financemanager.dto.IncomePageDto;

public interface IncomeService {
    IncomePageDto getIncomes(String username, Integer pageNumber, Integer pageSize, String sort);

    IncomePageDto getIncomesBySource(String username, Integer pageNumber, Integer pageSize, String sort, String shop);
    IncomeDto getIncomeDtoByIncomeId(Integer incomeId, String username);
    IncomeDto saveIncome(IncomeDto incomeDto, String username);
    IncomeDto updateIncome(Integer incomeId, IncomeDto incomeDto);
    void deleteIncomeById(Integer incomeId);
}
