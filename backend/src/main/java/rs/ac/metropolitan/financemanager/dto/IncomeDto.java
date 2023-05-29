package rs.ac.metropolitan.financemanager.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
@Data
public class IncomeDto {
    private Integer incomeId;
    private OffsetDateTime date;
    private String source;
    private BigDecimal earning;
    private UserDto userDto;
}
