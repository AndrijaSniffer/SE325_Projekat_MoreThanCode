package rs.ac.metropolitan.financemanager.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import rs.ac.metropolitan.financemanager.domain.Expense;
import rs.ac.metropolitan.financemanager.domain.User;
import rs.ac.metropolitan.financemanager.dto.ExpenseDto;
import rs.ac.metropolitan.financemanager.dto.ExpensePageDto;
import rs.ac.metropolitan.financemanager.dto.SortDto;
import rs.ac.metropolitan.financemanager.dto.UserDto;
import rs.ac.metropolitan.financemanager.model.*;

import java.util.List;
import java.util.Optional;

@Mapper

public interface ExpenseMapper {
    @ToCreateExpenseResponse
    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    CreateExpenseResponse mapCreatedExpenseDtoToResponse(ExpenseDto createdExpenseDto);

    UserDto mapUserToUserDto(User user);

    Expense mapExpenseDtoToExpense(ExpenseDto expenseDto);
    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    rs.ac.metropolitan.financemanager.model.Expense mapExpenseDtoToExpenseModel(ExpenseDto expenseDto);

    ExpenseDto mapCreateExpenseRequestToExpenseDto(CreateExpenseRequest createExpenseRequest);

    @Mappings({
            @Mapping(source = "user", target = "userDto")
    })
    ExpenseDto mapExpenseToExpenseDto(Expense byId);

    @ToGetExpenseById
    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    GetExpenseByIdResponse mapExpenseDtoToResponse(ExpenseDto expenseDtoByExpenseId);

    ExpenseDto mapUpdateExpenseRequestToExpenseDto(UpdateExpenseRequest updateExpenseRequest);

    @ToUpdateExpenseResponse
    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    UpdateExpenseResponse mapUpdatedExpenseDtoToResponse(ExpenseDto updatedExpenseDto);

    List<ExpenseDto> mapExpensesListToExpenseDtosList(List<Expense> expenses);

    ExpenseList mapExpenseDtosToResponse(List<ExpenseDto> expenseDtos);

    @Mappings({
            @Mapping(source = "number", target = "pageNumber"),
            @Mapping(source = "size", target = "pageSize"),
            @Mapping(source = "content", target = "expenseList"),
    })
    ExpensePageDto mapExpensesToExpensePageDto(Page<Expense> expenses);

    @Mappings({
            @Mapping(source = "first", target = "isFirst"),
            @Mapping(source = "last", target = "isLast")
    })
    GetExpensesResponse mapExpensePageDtotoGetExpensesResponse(ExpensePageDto expensePageDto);

    default SortDto mapSort(Sort sort) {
        SortDto sortDto = new SortDto();
        Optional<Sort.Order> order = sort.get().findAny();
        if (order.isPresent()) {
            sortDto.setOrder(order.get().getProperty());
            sortDto.setDirection(order.get().getDirection().toString());
        }
        return sortDto;
    }


}
