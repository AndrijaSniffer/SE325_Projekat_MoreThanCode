package rs.ac.metropolitan.financemanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.metropolitan.financemanager.dto.UserDto;
import rs.ac.metropolitan.financemanager.model.UserLoginRequest;
import rs.ac.metropolitan.financemanager.model.UserLoginResponse;
import rs.ac.metropolitan.financemanager.model.UserRegisterRequest;
import rs.ac.metropolitan.financemanager.model.UserRegisterResponse;
import rs.ac.metropolitan.financemanager.service.UserService;

@RestController
@RequiredArgsConstructor
public class UserController implements UsersApi{

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Override
    public ResponseEntity<UserRegisterResponse> registerUser(UserRegisterRequest userRegisterRequest) {
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userRegisterRequest, userDto);
        UserDto savedUserDto = userService.registerUser(userDto);
        UserRegisterResponse userRegisterResponse = new UserRegisterResponse();
        BeanUtils.copyProperties(savedUserDto, userRegisterResponse);
        return ResponseEntity.ok(userRegisterResponse);
    }

    @Override
    public ResponseEntity<UserLoginResponse> loginUser(UserLoginRequest userLoginRequest) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequest.getUsername(), userLoginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserLoginResponse userLoginResponse = new UserLoginResponse();
        BeanUtils.copyProperties(userService.findUserByUsername(userLoginRequest.getUsername()), userLoginResponse);
        return ResponseEntity.ok(userLoginResponse);
    }
}
