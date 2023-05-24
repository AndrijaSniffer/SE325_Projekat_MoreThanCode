package rs.ac.metropolitan.financemanager.controller;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.metropolitan.financemanager.dto.IncomeDto;
import rs.ac.metropolitan.financemanager.dto.IncomePageDto;
import rs.ac.metropolitan.financemanager.mapper.IncomeMapper;
import rs.ac.metropolitan.financemanager.model.*;
import rs.ac.metropolitan.financemanager.service.IncomeService;

@RestController
@RequiredArgsConstructor
public class IncomeController implements IncomesApi {
    private static final IncomeMapper MAPPER = Mappers.getMapper((IncomeMapper.class));

    private final IncomeService incomeService;

    @Override
    public ResponseEntity<GetIncomesResponse> getIncomes(Integer pageNumber, Integer pageSize, String sort) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        IncomePageDto incomePageDto = incomeService.getIncomes(username, pageNumber != null ? pageNumber : 0,
                pageSize != null ? pageSize : 10,
                sort != null ? sort : "date");
        GetIncomesResponse response = MAPPER.mapIncomePageDtotoGetIncomesResponse(incomePageDto);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetIncomesResponse> getIncomesBySource(String source,Integer pageNumber,Integer pageSize,String sort) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        IncomePageDto incomePageDto = incomeService.getIncomesBySource(username, pageNumber != null ? pageNumber : 0,
                pageSize != null ? pageSize : 10,
                sort != null ? sort : "date", source);
        GetIncomesResponse response = MAPPER.mapIncomePageDtotoGetIncomesResponse(incomePageDto);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetIncomeByIdResponse> getIncomeById(Integer incomeId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        GetIncomeByIdResponse response = MAPPER.mapIncomeDtoToResponse(incomeService.getIncomeDtoByIncomeId(incomeId, username));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CreateIncomeResponse> createIncome(CreateIncomeRequest createIncomeRequest) {
        IncomeDto incomeDto = MAPPER.mapCreateIncomeRequestToIncomeDto(createIncomeRequest);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        IncomeDto createdIncomeDto = incomeService.saveIncome(incomeDto, username);
        CreateIncomeResponse response = MAPPER.mapCreatedIncomeDtoToResponse(createdIncomeDto);
        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<UpdateIncomeResponse> updateIncome(Integer incomeId, UpdateIncomeRequest updateIncomeRequest) {
        IncomeDto incomeDto = MAPPER.mapUpdateIncomeRequestToIncomeDto(updateIncomeRequest);
        IncomeDto updatedIncomeDto = incomeService.updateIncome(incomeId, incomeDto);
        UpdateIncomeResponse response = MAPPER.mapUpdatedIncomeDtoToResponse(updatedIncomeDto);
        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<Void> deleteIncome(Integer incomeId) {
        incomeService.deleteIncomeById(incomeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
