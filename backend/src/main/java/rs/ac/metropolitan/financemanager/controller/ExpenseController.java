package rs.ac.metropolitan.financemanager.controller;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.metropolitan.financemanager.dto.ExpenseDto;
import rs.ac.metropolitan.financemanager.dto.ExpensePageDto;
import rs.ac.metropolitan.financemanager.mapper.ExpenseMapper;
import rs.ac.metropolitan.financemanager.model.*;
import rs.ac.metropolitan.financemanager.service.ExpenseService;

@RestController
@RequiredArgsConstructor
public class ExpenseController implements ExpensesApi {

    private static final ExpenseMapper MAPPER = Mappers.getMapper((ExpenseMapper.class));
    private final ExpenseService expenseService;

    @Override
    public ResponseEntity<GetExpensesResponse> getExpenses(Integer pageNumber, Integer pageSize, String sort) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ExpensePageDto expensePageDto = expenseService.getExpenses(username, pageNumber != null ? pageNumber : 0,
                pageSize != null ? pageSize : 10,
                sort != null ? sort : "date");
        GetExpensesResponse response = MAPPER.mapExpensePageDtotoGetExpensesResponse(expensePageDto);
        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<GetExpensesResponse> getExpensesByShop(String shop,Integer pageNumber,Integer pageSize,String sort) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ExpensePageDto expensePageDto = expenseService.getExpensesByShop(username, pageNumber != null ? pageNumber : 0,
                pageSize != null ? pageSize : 10,
                sort != null ? sort : "date", shop);
        GetExpensesResponse response = MAPPER.mapExpensePageDtotoGetExpensesResponse(expensePageDto);
        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<GetExpenseByIdResponse> getExpenseById(Integer expenseId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        GetExpenseByIdResponse response = MAPPER.mapExpenseDtoToResponse(expenseService.getExpenseDtoByExpenseId(expenseId, username));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CreateExpenseResponse> createExpense(CreateExpenseRequest createExpenseRequest) {
        ExpenseDto expenseDto = MAPPER.mapCreateExpenseRequestToExpenseDto(createExpenseRequest);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ExpenseDto createdExpenseDto = expenseService.saveExpense(expenseDto, username);
        CreateExpenseResponse response = MAPPER.mapCreatedExpenseDtoToResponse(createdExpenseDto);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<UpdateExpenseResponse> updateExpense(Integer expenseId, UpdateExpenseRequest updateExpenseRequest) {
        ExpenseDto expenseDto = MAPPER.mapUpdateExpenseRequestToExpenseDto(updateExpenseRequest);
        ExpenseDto updatedExpenseDto = expenseService.updateExpense(expenseId, expenseDto);
        UpdateExpenseResponse response = MAPPER.mapUpdatedExpenseDtoToResponse(updatedExpenseDto);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Void> deleteExpense(Integer expenseId) {
        expenseService.deleteExpenseById(expenseId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
