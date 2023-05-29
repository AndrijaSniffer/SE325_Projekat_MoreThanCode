package rs.ac.metropolitan.financemanager.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rs.ac.metropolitan.financemanager.domain.User;
import rs.ac.metropolitan.financemanager.dto.UserDto;
import rs.ac.metropolitan.financemanager.exceptions.UsernameAlreadyExistsException;
import rs.ac.metropolitan.financemanager.repository.UserRepository;
import rs.ac.metropolitan.financemanager.service.UserService;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserDto registerUser(UserDto userDto) {
            checkIfUsernameExists(userDto.getUsername());
            User user = new User();
            UserDto savedUser = new UserDto();
            BeanUtils.copyProperties(userDto, user);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            BeanUtils.copyProperties(userRepository.save(user), savedUser);
            return savedUser;
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found!!!"));
    }

    private void checkIfUsernameExists(String username){
        if(userRepository.findUserByUsername(username).isPresent()){
            throw new UsernameAlreadyExistsException("Username already exists!!!");
        }
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username + " not found!!!"));
        return new UserDetailsImpl(user.getUsername(), user.getPassword());
    }
}
