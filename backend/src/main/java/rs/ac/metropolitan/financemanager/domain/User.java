package rs.ac.metropolitan.financemanager.domain;


import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Integer userId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;

    @OneToMany(mappedBy="user")
    List<Expense> userExpenses;

    @OneToMany(mappedBy="user")
    List<Income> userIncomes;
}
