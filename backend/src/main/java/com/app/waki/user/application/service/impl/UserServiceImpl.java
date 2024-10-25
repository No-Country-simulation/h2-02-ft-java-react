package com.app.waki.user.application.service.impl;

import com.app.waki.common.exceptions.EmailNotAvailableException;
import com.app.waki.user.application.utils.UserMapper;
import com.app.waki.user.application.utils.UserAuth;
import com.app.waki.user.application.dto.CreateUserRequestDto;
import com.app.waki.user.application.dto.JwtAuthToken;
import com.app.waki.user.application.dto.LoginUserAuthDto;
import com.app.waki.user.application.dto.UserDto;
import com.app.waki.common.events.UserCreatedEvent;
import com.app.waki.user.application.service.TokenService;
import com.app.waki.user.application.service.UserService;
import com.app.waki.user.domain.*;
import com.app.waki.user.domain.valueObject.Email;
import com.app.waki.user.domain.valueObject.Password;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final ApplicationEventPublisher publisher;

    @Transactional
    public UserDto createUser(CreateUserRequestDto userRequest){

        if (userRepository.existsByEmail(new Email(userRequest.email()))) {
            throw new EmailNotAvailableException("Email not available.");
        }
        Password validatePassword = new Password(userRequest.password());
        User newUser = User.createUser(
                userRequest.username(),
                userRequest.email(),
                passwordEncoder.encode(validatePassword.password()));
        userRepository.save(newUser);
        publisher.publishEvent(new UserCreatedEvent(newUser.getId(), newUser.getUsername()));

        return UserMapper.userToUserDTO(newUser);
    }

    public JwtAuthToken loginUserAuthentication(LoginUserAuthDto loginUserCredentials){

        User findUser = userRepository.findByEmail(new Email(loginUserCredentials.email()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginUserCredentials.email(), loginUserCredentials.password()
                )
        );
        var userAuth = new UserAuth(findUser);
        Map<String, Object> setId = new HashMap<>();
        setId.put("User_id", findUser.getId());
        var jwtToken = tokenService.generateToken(setId, userAuth);

        return new JwtAuthToken(jwtToken);
    }



}
