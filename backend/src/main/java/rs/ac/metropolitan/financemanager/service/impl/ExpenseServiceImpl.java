package rs.ac.metropolitan.financemanager.service.impl;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.metropolitan.financemanager.domain.Expense;
import rs.ac.metropolitan.financemanager.domain.User;
import rs.ac.metropolitan.financemanager.dto.ExpenseDto;
import rs.ac.metropolitan.financemanager.dto.ExpensePageDto;
import rs.ac.metropolitan.financemanager.exceptions.ExpenseNotFoundException;
import rs.ac.metropolitan.financemanager.mapper.ExpenseMapper;
import rs.ac.metropolitan.financemanager.repository.ExpenseRepository;
import rs.ac.metropolitan.financemanager.service.ExpenseService;
import rs.ac.metropolitan.financemanager.service.UserService;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseServiceImpl implements ExpenseService {
    private static final ExpenseMapper MAPPER = Mappers.getMapper((ExpenseMapper.class));
    private final ExpenseRepository expenseRepository;
    private final UserService userService;
    @Override
    public ExpensePageDto getExpenses(String username, Integer pageNumber, Integer pageSize, String sort) {
        Sort.Direction sortDirection = sort.startsWith("-") ? Sort.Direction.DESC : Sort.Direction.ASC;
        if(sort.startsWith("-"))
            sort = sort.substring(1);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortDirection, sort);
        Page<Expense> expenses = expenseRepository.findAll(pageable);
        return MAPPER.mapExpensesToExpensePageDto(expenses);
    }

    @Override
    public ExpenseDto getExpenseDtoByExpenseId(Integer expenseId, String username) {
        Expense expense = expenseRepository.findByExpenseIdAndAndUser_Username(expenseId, username)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense with ID: " + expenseId + " doesn't exist!"));
        return MAPPER.mapExpenseToExpenseDto(expense);
    }

    @Override
    public ExpenseDto saveExpense(ExpenseDto expenseDto, String username) {
        Expense expense = MAPPER.mapExpenseDtoToExpense(expenseDto);
        User user = userService.findUserByUsername(username);
        expense.setUser(user);
        Expense createdExpense = expenseRepository.save(expense);
        ExpenseDto createdExpenseDto = MAPPER.mapExpenseToExpenseDto(createdExpense);
        createdExpenseDto.setUserDto(MAPPER.mapUserToUserDto(user));
        return createdExpenseDto;
    }

    @Override
    public ExpenseDto updateExpense(Integer expenseId, ExpenseDto expenseDto) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense with ID: " + expenseId + " doesn't exist!"));
        User user = expense.getUser();
        expense = MAPPER.mapExpenseDtoToExpense(expenseDto);
        expense.setExpenseId(expenseId);
        expense.setUser(user);
        Expense createdExpense = expenseRepository.save(expense);
        return MAPPER.mapExpenseToExpenseDto(createdExpense);
    }

    @Override
    public void deleteExpenseById(Integer expenseId) {
        expenseRepository.deleteById(expenseId);
    }
}
