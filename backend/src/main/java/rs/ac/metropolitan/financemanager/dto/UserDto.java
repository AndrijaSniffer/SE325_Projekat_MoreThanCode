package rs.ac.metropolitan.financemanager.dto;

import lombok.Data;

@Data
public class UserDto {

    private Integer userId;
    private String firstName = null;

    private String lastName = null;

    private String username = null;

    private String password = null;
}
