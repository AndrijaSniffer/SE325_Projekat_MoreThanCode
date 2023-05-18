package rs.ac.metropolitan.financemanager.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
public class ExpenseDto {
    private Integer expenseId;
    private OffsetDateTime date;
    private String shop;
    private BigDecimal cost;
    private UserDto userDto;
}
