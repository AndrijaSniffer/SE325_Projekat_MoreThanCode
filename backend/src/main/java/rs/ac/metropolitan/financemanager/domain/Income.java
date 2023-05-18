package rs.ac.metropolitan.financemanager.domain;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
@Entity
@Data
@Table(name = "incomes")
public class Income {
    @Id
    @GeneratedValue
    private Integer incomeId;
    private Date date;
    private String source;
    private BigDecimal earning;
    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
}
