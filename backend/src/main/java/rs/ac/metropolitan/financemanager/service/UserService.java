package rs.ac.metropolitan.financemanager.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import rs.ac.metropolitan.financemanager.domain.User;
import rs.ac.metropolitan.financemanager.dto.UserDto;

public interface UserService extends UserDetailsService {

    UserDto registerUser(UserDto user);

    User findUserByUsername(String username);
}
