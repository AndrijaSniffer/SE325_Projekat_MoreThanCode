package rs.ac.metropolitan.financemanager.dto;

import lombok.Data;

import java.util.List;
@Data
public class IncomePageDto {
    private Integer totalPages;

    private Integer totalElements;

    private Integer pageSize;

    private Integer pageNumber;

    private boolean isFirst;

    private boolean isLast;

    private SortDto sort;

    private List<IncomeDto> incomeList;
}
