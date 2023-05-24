package rs.ac.metropolitan.financemanager.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import rs.ac.metropolitan.financemanager.domain.Income;
import rs.ac.metropolitan.financemanager.domain.User;
import rs.ac.metropolitan.financemanager.dto.*;
import rs.ac.metropolitan.financemanager.model.*;

import java.util.Optional;

@Mapper
public interface IncomeMapper {
    @Mappings({
            @Mapping(source = "number", target = "pageNumber"),
            @Mapping(source = "size", target = "pageSize"),
            @Mapping(source = "content", target = "incomeList"),
    })
    IncomePageDto mapIncomesToIncomePageDto(Page<Income> incomes);
    @Mappings({
            @Mapping(source = "first", target = "isFirst"),
            @Mapping(source = "last", target = "isLast")
    })
    GetIncomesResponse mapIncomePageDtotoGetIncomesResponse(IncomePageDto incomePageDto);

    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    rs.ac.metropolitan.financemanager.model.Income mapIncomeDtoToIncomeModel(IncomeDto incomeDto);
    @Mappings({
            @Mapping(source = "user", target = "userDto")
    })
    IncomeDto mapIncomeToIncomeDto(Income income);
    @ToGetIncomeById
    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    GetIncomeByIdResponse mapIncomeDtoToResponse(IncomeDto incomeDtoByIncomeId);

    Income mapIncomeDtoToIncome(IncomeDto incomeDto);
    UserDto mapUserToUserDto(User user);
    IncomeDto mapCreateIncomeRequestToIncomeDto(CreateIncomeRequest createIncomeRequest);
    @ToCreateIncomeResponse
    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    CreateIncomeResponse mapCreatedIncomeDtoToResponse(IncomeDto createdIncomeDto);
    IncomeDto mapUpdateIncomeRequestToIncomeDto(UpdateIncomeRequest updateIncomeRequest);
    @ToUpdateIncomeResponse
    @Mappings({
            @Mapping(source = "userDto", target = "user")
    })
    UpdateIncomeResponse mapUpdatedIncomeDtoToResponse(IncomeDto updatedIncomeDto);

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
