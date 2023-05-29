package rs.ac.metropolitan.financemanager.domain;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Date;
@Entity
@Data
@Table(name = "incomes")
public class Income {
    @Id
    @GeneratedValue
    private Integer incomeId;
    private OffsetDateTime date;
    private String source;
    private BigDecimal earning;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
