package rs.ac.metropolitan.financemanager.service.impl;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.metropolitan.financemanager.domain.Income;
import rs.ac.metropolitan.financemanager.domain.User;
import rs.ac.metropolitan.financemanager.dto.IncomeDto;
import rs.ac.metropolitan.financemanager.dto.IncomePageDto;
import rs.ac.metropolitan.financemanager.exceptions.ExpenseNotFoundException;
import rs.ac.metropolitan.financemanager.exceptions.IncomeNotFoundException;
import rs.ac.metropolitan.financemanager.mapper.IncomeMapper;
import rs.ac.metropolitan.financemanager.repository.IncomeRepository;
import rs.ac.metropolitan.financemanager.repository.UserRepository;
import rs.ac.metropolitan.financemanager.service.IncomeService;
import rs.ac.metropolitan.financemanager.service.UserService;

@Service
@RequiredArgsConstructor
@Transactional
public class IncomeServiceImpl implements IncomeService {
    private static final IncomeMapper MAPPER = Mappers.getMapper((IncomeMapper.class));
    private final IncomeRepository incomeRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    @Override
    public IncomePageDto getIncomes(String username, Integer pageNumber, Integer pageSize, String sort) {
        Sort.Direction sortDirection = sort.startsWith("-") ? Sort.Direction.DESC : Sort.Direction.ASC;
        if (sort.startsWith("-"))
            sort = sort.substring(1);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortDirection, sort);
        userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found!!!"));
        Page<Income> incomes = incomeRepository.findAllByUser_Username(pageable, username);
        return MAPPER.mapIncomesToIncomePageDto(incomes);
    }

    @Override
    public IncomePageDto getIncomesBySource(String username, Integer pageNumber, Integer pageSize, String sort, String source) {
        Sort.Direction sortDirection = sort.startsWith("-") ? Sort.Direction.DESC : Sort.Direction.ASC;
        if(sort.startsWith("-"))
            sort = sort.substring(1);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortDirection, sort);
        userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found!!!"));
        Page<Income> incomes = incomeRepository.findAllByUser_UsernameAndSource(pageable, username, source);
        return MAPPER.mapIncomesToIncomePageDto(incomes);
    }

    @Override
    public IncomeDto getIncomeDtoByIncomeId(Integer incomeId, String username) {
        userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found!!!"));
        Income income = incomeRepository.findByIncomeIdAndUser_Username(incomeId, username)
                .orElseThrow(() -> new IncomeNotFoundException("Income with ID: " + incomeId + " doesn't exist!"));
        return MAPPER.mapIncomeToIncomeDto(income);
    }

    @Override
    public IncomeDto saveIncome(IncomeDto incomeDto, String username) {
        Income income = MAPPER.mapIncomeDtoToIncome(incomeDto);
        User user = userService.findUserByUsername(username);
        income.setUser(user);
        Income createdIncome = incomeRepository.save(income);
        IncomeDto createdIncomeDto = MAPPER.mapIncomeToIncomeDto(createdIncome);
        createdIncomeDto.setUserDto(MAPPER.mapUserToUserDto(user));
        return createdIncomeDto;
    }

    @Override
    public IncomeDto updateIncome(Integer incomeId, IncomeDto incomeDto) {
        Income income = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new ExpenseNotFoundException("Income with ID: " + incomeId + " doesn't exist!"));
        User user = income.getUser();
        income = MAPPER.mapIncomeDtoToIncome(incomeDto);
        income.setIncomeId(incomeId);
        income.setUser(user);
        Income createdIncome = incomeRepository.save(income);
        return MAPPER.mapIncomeToIncomeDto(createdIncome);
    }

    @Override
    public void deleteIncomeById(Integer incomeId) {
        incomeRepository.deleteById(incomeId);
    }
}
