package rs.ac.metropolitan.financemanager.domain;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Data
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue
    private Integer expenseId;
    private OffsetDateTime date;
    private String shop;
    private BigDecimal cost;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
